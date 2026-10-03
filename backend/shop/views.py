import base64
import io
import logging
import secrets
from datetime import timedelta
from urllib.parse import quote, urlencode

import qrcode
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.db import IntegrityError, transaction
from django.db.models import F
from django.utils import timezone
from rest_framework import serializers, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, ScopedRateThrottle
from rest_framework.views import APIView

from .models import Order, OrderItem, Product

log = logging.getLogger(__name__)
User = get_user_model()


# ───────────────────────── UPI QR ─────────────────────────
def upi_uri(order):
    """Amount, payee and order id are fixed by the SERVER, not the browser."""
    params = {
        "pa": settings.UPI_ID,
        "pn": settings.UPI_PAYEE_NAME,
        "am": f"{order.total:.2f}",
        "cu": "INR",
        "tn": f"Order {order.order_id}",
    }
    return "upi://pay?" + urlencode(params, quote_via=quote)


def qr_data_uri(text):
    img = qrcode.make(text, box_size=8, border=2)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


# ───────────────────────── Payment window / public status ─────────────────────────
def payment_window():
    return timedelta(minutes=getattr(settings, "PAYMENT_WINDOW_MINUTES", 30))


def expires_at(order):
    return order.created_at + payment_window()


def cancel_and_restock(order):
    for it in order.items.select_related("product"):
        if it.product_id:
            Product.objects.filter(pk=it.product_id).update(stock=F("stock") + it.quantity)
    order.status = Order.Status.CANCELLED
    order.save()


def expire_if_needed(order):
    """Call inside transaction with the row locked. Returns True if the order just expired."""
    if order.status == Order.Status.PENDING and timezone.now() > expires_at(order):
        cancel_and_restock(order)
        return True
    return False


def public_state(order):
    """Status names the payment page understands."""
    St = Order.Status
    if order.status == St.CANCELLED:
        return "REJECTED" if order.utr else "EXPIRED"
    return {
        St.PENDING: "PENDING",
        St.PAYMENT_SUBMITTED: "PAYMENT_SUBMITTED",
        St.PAID: "CONFIRMED",
        St.DISPATCHED: "DISPATCHED",
    }[order.status]


# ───────────────────────── Emails ─────────────────────────
def _items_text(order):
    return "\n".join(f"  - {i.name} x {i.quantity} = ₹{i.price * i.quantity:,}" for i in order.items.all())


def _send(subject, body, to):
    try:
        send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [to], fail_silently=False)
    except Exception:
        # Never let a mail failure break order handling
        log.exception("Email failed: %s -> %s", subject, to)


def email_payment_submitted(order):
    """Sent as soon as the customer submits the UTR – to customer AND admin."""
    _send(
        f"Payment received for verification – {order.order_id}",
        f"Hi {order.name},\n\nThank you! We received your payment details.\n\n"
        f"Order ID: {order.order_id}\nUTR: {order.utr}\nAmount: ₹{order.total:,}\n\n"
        f"Items:\n{_items_text(order)}\n\n"
        f"We are verifying the payment and will email you once it is confirmed.\n\nBigScrew Solutions",
        order.email,
    )
    _send(
        f"VERIFY PAYMENT – {order.order_id} – ₹{order.total:,}",
        f"A customer submitted a UPI payment. Check it in your bank/UPI app, then mark it paid in the dashboard.\n\n"
        f"Order: {order.order_id}\nExpected amount: ₹{order.total:,}\nUTR: {order.utr}\n\n"
        f"Customer: {order.name} | {order.phone} | {order.email}\n"
        f"Company: {order.company} {order.gstin}\n"
        f"Address: {order.address}, {order.city}, {order.state} - {order.pincode}\n"
        f"Notes: {order.notes}\n\nItems:\n{_items_text(order)}",
        settings.ADMIN_NOTIFY_EMAIL,
    )


def email_payment_confirmed(order):
    _send(
        f"Payment confirmed – {order.order_id}",
        f"Hi {order.name},\n\nYour payment is verified. Thank you!\n\n"
        f"Order ID: {order.order_id}\nUTR: {order.utr}\n\nItems:\n{_items_text(order)}\n\n"
        f"Subtotal: ₹{order.subtotal:,}\nGST: ₹{order.gst:,}\nTotal paid: ₹{order.total:,}\n\n"
        f"We will dispatch your order soon.\n\nBigScrew Solutions",
        order.email,
    )


def email_dispatched(order):
    _send(
        f"Order dispatched – {order.order_id}",
        f"Hi {order.name},\n\nYour order {order.order_id} has been dispatched.\n"
        f"Courier: {order.courier or '-'}\nTracking no: {order.tracking_no or '-'}\n\nBigScrew Solutions",
        order.email,
    )


# ───────────────────────── Serializers ─────────────────────────
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description", "price", "stock", "min_order_qty", "is_active"]
        read_only_fields = ["slug"]


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["name", "price", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        exclude = ["public_token"]  # secret – never sent to the admin UI


class CartLine(serializers.Serializer):
    slug = serializers.SlugField()  # frontend sends the product slug
    quantity = serializers.IntegerField(min_value=1, max_value=100000)


class CheckoutSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=120)
    email = serializers.EmailField()
    phone = serializers.RegexField(r"^[0-9+\- ]{10,15}$")
    company = serializers.CharField(max_length=160, required=False, allow_blank=True)
    gstin = serializers.CharField(max_length=20, required=False, allow_blank=True)
    address = serializers.CharField()
    city = serializers.CharField(max_length=80)
    state = serializers.CharField(max_length=80)
    pincode = serializers.RegexField(r"^[0-9]{6}$")
    notes = serializers.CharField(required=False, allow_blank=True)
    items = CartLine(many=True, allow_empty=False)


# ───────────────────────── Public: shop + payment ─────────────────────────
class PublicProductList(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_active=True)


class CreateOrderView(APIView):
    """Step 1: server calculates the price, reserves stock and returns the UPI QR for the exact amount."""
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        s = CheckoutSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        d = s.validated_data

        with transaction.atomic():
            lines, subtotal = [], 0
            for it in d["items"]:
                p = Product.objects.select_for_update().filter(slug=it["slug"], is_active=True).first()
                if not p:
                    return Response({"detail": "A product in your cart is no longer available."}, status=400)
                if it["quantity"] < p.min_order_qty:
                    return Response({"detail": f"Minimum order for {p.name} is {p.min_order_qty} pieces."}, status=400)
                if it["quantity"] > p.stock:
                    return Response({"detail": f"Only {p.stock} of {p.name} in stock."}, status=400)
                lines.append((p, it["quantity"]))
                subtotal += p.price * it["quantity"]

            gst = round(subtotal * settings.GST_PERCENT / 100)
            order = Order.objects.create(
                **{k: v for k, v in d.items() if k != "items"},
                subtotal=subtotal, gst=gst, total=subtotal + gst,
            )
            for p, qty in lines:
                OrderItem.objects.create(order=order, product=p, name=p.name, price=p.price, quantity=qty)
                Product.objects.filter(pk=p.pk).update(stock=F("stock") - qty)  # reserve stock

        # the payment page fetches QR + amount from /orders/status/ using this token
        return Response({"order_id": order.order_id, "public_token": order.public_token}, status=201)


class SubmitPaymentView(APIView):
    """Step 2: customer has paid in their UPI app and submits the 12-digit UTR / reference number."""
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [AnonRateThrottle]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def post(self, request):
        order_id = request.data.get("order_id", "")
        token = request.data.get("public_token", "")
        utr = str(request.data.get("utr", "")).strip()
        shot = request.FILES.get("screenshot")

        if not (utr.isdigit() and len(utr) == 12):
            return Response({"detail": "Enter the 12-digit UTR / UPI reference number."}, status=400)
        if shot and (shot.size > 5 * 1024 * 1024 or not (shot.content_type or "").startswith("image/")):
            return Response({"detail": "Upload an image (JPG/PNG) under 5 MB."}, status=400)

        try:
            with transaction.atomic():
                order = Order.objects.select_for_update().filter(order_id=order_id).first()
                if not order or not secrets.compare_digest(order.public_token, str(token)):
                    return Response({"detail": "Order not found."}, status=404)
                if expire_if_needed(order):
                    return Response({"detail": "This order expired. Please place the order again."}, status=400)
                if order.status != Order.Status.PENDING:
                    return Response({"detail": "Payment already submitted for this order."}, status=400)
                order.utr = utr
                if shot:
                    order.payment_screenshot = shot
                order.status = Order.Status.PAYMENT_SUBMITTED
                order.payment_submitted_at = timezone.now()
                order.save()
        except IntegrityError:
            return Response({"detail": "This UTR has already been used on another order."}, status=400)

        email_payment_submitted(order)
        return Response({"order_id": order.order_id, "status": order.status})


class PaymentStatusView(APIView):
    """Used by the payment page: returns QR + amount while pending, then the live status (polled)."""
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        order_id = request.data.get("order_id", "")
        token = str(request.data.get("public_token", ""))
        with transaction.atomic():
            order = Order.objects.select_for_update().filter(order_id=order_id).first()
            if not order or not secrets.compare_digest(order.public_token, token):
                return Response({"detail": "Order not found."}, status=404)
            expire_if_needed(order)

        data = {"state": public_state(order)}
        if order.status == Order.Status.PENDING:
            uri = upi_uri(order)
            data.update({
                "upi_link": uri,
                "qr": qr_data_uri(uri),
                "amount_paise": order.total * 100,
                "expires_at": expires_at(order).isoformat(),
            })
        return Response(data)


# ───────────────────────── Admin ─────────────────────────
class AdminLoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "login"  # 5/min per IP, see settings

    def post(self, request):
        email = (request.data.get("email") or "").strip().lower()
        password = request.data.get("password") or ""
        user = User.objects.filter(email__iexact=email, is_staff=True, is_active=True).first()
        if not user or not user.check_password(password):
            return Response({"detail": "Invalid credentials"}, status=401)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})


class AdminProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by("id")


class AdminOrderList(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = OrderSerializer
    # orders where the customer never submitted a UTR are hidden
    queryset = Order.objects.exclude(status=Order.Status.PENDING).prefetch_related("items")


S = Order.Status
ALLOWED = {
    S.PENDING: {S.CANCELLED},
    S.PAYMENT_SUBMITTED: {S.PAID, S.CANCELLED},   # admin verifies payment in bank app
    S.PAID: {S.DISPATCHED, S.CANCELLED},          # dispatch only possible after verification
}


class AdminOrderUpdate(APIView):
    """payment_submitted → paid → dispatched. Dispatch is impossible before payment is verified."""
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        with transaction.atomic():
            order = Order.objects.select_for_update().filter(pk=pk).first()
            if not order:
                return Response({"detail": "Not found"}, status=404)
            new = request.data.get("status")
            if new not in ALLOWED.get(order.status, set()):
                return Response({"detail": f"Cannot move order from {order.status} to {new}."}, status=400)

            if new == S.CANCELLED:
                for it in order.items.select_related("product"):
                    if it.product_id:
                        Product.objects.filter(pk=it.product_id).update(stock=F("stock") + it.quantity)
            if new == S.PAID:
                order.paid_at = timezone.now()
            if new == S.DISPATCHED:
                order.courier = str(request.data.get("courier", ""))[:80]
                order.tracking_no = str(request.data.get("tracking_no", ""))[:80]
                order.dispatched_at = timezone.now()
            order.status = new
            order.save()

        if new == S.PAID:
            email_payment_confirmed(order)
        if new == S.DISPATCHED:
            email_dispatched(order)
        return Response(OrderSerializer(order, context={"request": request}).data)