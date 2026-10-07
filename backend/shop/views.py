import base64
import io
import logging
import secrets
import smtplib
from datetime import timedelta
from urllib.parse import quote, urlencode

import qrcode
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.db import IntegrityError, transaction
from django.db.models import F
from django.utils import timezone
from django.utils.html import escape
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
def payment_minutes():
    """Single source of truth for the payment window (default 10 minutes)."""
    return getattr(settings, "PAYMENT_WINDOW_MINUTES", 10)


def payment_window():
    return timedelta(minutes=payment_minutes())


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
        return "REJECTED" if order.payment_submitted_at else "EXPIRED"
    return {
        St.PENDING: "PENDING",
        St.PAYMENT_SUBMITTED: "PAYMENT_SUBMITTED",
        St.PAID: "CONFIRMED",
        St.DISPATCHED: "DISPATCHED",
    }[order.status]


# ───────────────────────── Emails ─────────────────────────
# Brand colours (same look as the BigScrew website: black + yellow)
BRAND_YELLOW = "#F7C325"
BRAND_INK = "#111111"
BRAND_BG = "#F4F4F2"
BRAND_MUTED = "#6B6B6B"
SITE_URL = getattr(settings, "SITE_URL", "https://www.bigscrew.in")

# Admin gets a low-stock email when a product's stock drops below this number.
# Override in settings.py with LOW_STOCK_LIMIT = 50 (default 100).
LOW_STOCK_LIMIT = getattr(settings, "LOW_STOCK_LIMIT", 100)


def _e(value):
    """HTML-escape any customer-entered value before putting it in an email."""
    return escape(str(value)) if value not in (None, "") else "-"


def _items_text(order):
    return "\n".join(f"  - {i.name} x {i.quantity} = ₹{i.price * i.quantity:,}" for i in order.items.all())


def _p(text):
    return (
        f'<p style="margin:0;font-size:15px;line-height:1.6;color:{BRAND_INK};">'
        f"{escape(text)}</p>"
    )


def _rows(pairs):
    """Label / value table. Values must already be escaped (use _e)."""
    out = "".join(
        f'<tr><td style="padding:6px 0;width:130px;vertical-align:top;font-size:14px;color:{BRAND_MUTED};">'
        f"{escape(label)}</td>"
        f'<td style="padding:6px 0;font-size:14px;font-weight:700;color:{BRAND_INK};">{value}</td></tr>'
        for label, value in pairs
    )
    return f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0">{out}</table>'


def _items_html(order):
    rows = "".join(
        f'<tr><td style="padding:10px 0;border-bottom:1px solid #EEEEEE;font-size:14px;color:{BRAND_INK};">{_e(i.name)}</td>'
        f'<td align="center" style="padding:10px 0;border-bottom:1px solid #EEEEEE;font-size:14px;color:{BRAND_MUTED};">× {i.quantity}</td>'
        f'<td align="right" style="padding:10px 0;border-bottom:1px solid #EEEEEE;font-size:14px;font-weight:700;color:{BRAND_INK};">₹{i.price * i.quantity:,}</td></tr>'
        for i in order.items.all()
    )
    totals = (
        f'<tr><td colspan="2" style="padding:10px 0 2px 0;font-size:13px;color:{BRAND_MUTED};">Subtotal</td>'
        f'<td align="right" style="padding:10px 0 2px 0;font-size:13px;color:{BRAND_INK};">₹{order.subtotal:,}</td></tr>'
        f'<tr><td colspan="2" style="padding:2px 0;font-size:13px;color:{BRAND_MUTED};">GST</td>'
        f'<td align="right" style="padding:2px 0;font-size:13px;color:{BRAND_INK};">₹{order.gst:,}</td></tr>'
        f'<tr><td colspan="2" style="padding:10px 0;font-size:16px;font-weight:700;color:{BRAND_INK};">Total</td>'
        f'<td align="right" style="padding:10px 0;font-size:18px;font-weight:700;color:{BRAND_INK};">₹{order.total:,}</td></tr>'
    )
    return f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0">{rows}{totals}</table>'


def _address_html(order):
    return _p(f"{order.address}, {order.city}, {order.state} - {order.pincode}")


def _email_html(eyebrow, title, subtitle, badge_label, badge_value, blocks):
    """BigScrew branded email: black header, yellow strip, white body."""
    body = ""
    for heading, inner in blocks:
        head = (
            f'<div style="border-left:4px solid {BRAND_YELLOW};padding-left:10px;margin-bottom:12px;'
            f"font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;"
            f'color:{BRAND_INK};">{escape(heading)}</div>'
            if heading
            else ""
        )
        body += f'<tr><td style="padding:26px 40px 0 40px;">{head}{inner}</td></tr>'
    site_label = SITE_URL.replace("https://", "").replace("http://", "")
    return f"""<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:{BRAND_BG};font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:{BRAND_BG};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;">
<tr><td style="background:{BRAND_INK};padding:30px 40px;">
<div style="font-size:13px;font-weight:700;letter-spacing:3px;color:{BRAND_YELLOW};">BIGSCREW</div>
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#BDBDBD;margin-top:18px;">{escape(eyebrow)}</div>
<div style="font-size:26px;font-weight:700;color:#FFFFFF;margin-top:6px;">{escape(title)}</div>
<div style="font-size:14px;color:#BDBDBD;margin-top:6px;">{escape(subtitle)}</div>
</td></tr>
<tr><td style="background:{BRAND_YELLOW};padding:14px 40px;">
<span style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;color:{BRAND_INK};">{escape(badge_label)}</span>
<span style="font-size:16px;font-weight:700;color:{BRAND_INK};margin-left:10px;">{escape(badge_value)}</span>
</td></tr>
{body}
<tr><td style="padding:30px 40px;">
<div style="border-top:1px solid #E5E5E5;padding-top:18px;font-size:12px;line-height:1.6;color:{BRAND_MUTED};">
BigScrew Solutions &middot; Helical screw piles &amp; ground screws<br>
<a href="{SITE_URL}" style="color:{BRAND_INK};font-weight:700;">{site_label}</a>
</div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>"""


def _send(subject, body, to, html=None):
    """Send one email (plain text + optional HTML) to a single recipient. No CC."""
    try:
        msg = EmailMultiAlternatives(subject, body, settings.DEFAULT_FROM_EMAIL, [to])
        if html:
            msg.attach_alternative(html, "text/html")
        sent_count = msg.send(fail_silently=False)
        if sent_count != 1:
            log.error("Email backend did not send: %s -> %s", subject, to)
            return False
        log.info("Email sent: %s -> %s", subject, to)
        return True
    except (smtplib.SMTPException, OSError):
        log.exception("Email failed: %s -> %s", subject, to)
        return False


def email_order_created(order):
    """Sent as soon as the order is placed: to the customer, and a heads-up to the admin."""
    html = _email_html(
        "Order received",
        f"Thank you, {order.name}",
        "Please complete your UPI payment to confirm the order.",
        "Order ID",
        order.order_id,
        [
            (
                "Next step",
                _p(f"Complete the UPI payment on the payment page within {payment_minutes()} minutes, "
                   f"then upload your payment screenshot."),
            ),
            ("Your items", _items_html(order)),
            ("Delivery address", _address_html(order)),
        ],
    )
    _send(
        f"Order received – {order.order_id}",
        f"Hi {order.name},\n\nWe received your order {order.order_id}.\n"
        f"Please complete the UPI payment on the payment page within "
        f"{payment_minutes()} minutes.\n\n"
        f"Items:\n{_items_text(order)}\n\n"
        f"Subtotal: ₹{order.subtotal:,}\nGST: ₹{order.gst:,}\nTotal: ₹{order.total:,}\n\n"
        f"BigScrew Solutions",
        order.email,
        html=html,
    )

    # Admin heads-up: order placed, payment not received yet (no CC)
    admin_html = _email_html(
        "New order received",
        f"New order from {order.name}",
        f"{order.company or 'Individual customer'} · ₹{order.total:,}",
        "Order ID",
        order.order_id,
        [
            (
                "Status",
                _p(f"{order.name} has placed an order and is now on the payment page. "
                   f"Payment is not received yet. You will get another email when the customer "
                   f"uploads the payment screenshot."),
            ),
            (
                "Contact details",
                _rows([
                    ("Name", _e(order.name)),
                    ("Email", f'<a href="mailto:{_e(order.email)}" style="color:{BRAND_INK};">{_e(order.email)}</a>'),
                    ("Phone", _e(order.phone)),
                    ("Company", _e(order.company)),
                    ("GSTIN", _e(order.gstin)),
                ]),
            ),
            ("Items", _items_html(order)),
            ("Delivery address", _address_html(order)),
            ("Notes", _p(order.notes or "-")),
        ],
    )
    _send(
        f"New order placed – {order.order_id} – awaiting payment",
        f"{order.name} has placed an order and is now on the payment page. "
        f"Payment is not received yet.\n\n"
        f"Order: {order.order_id}\nTotal: ₹{order.total:,}\n\n"
        f"Customer: {order.name} | {order.phone} | {order.email}\n"
        f"Company: {order.company or '-'}  GSTIN: {order.gstin or '-'}\n"
        f"Address: {order.address}, {order.city}, {order.state} - {order.pincode}\n"
        f"Notes: {order.notes or '-'}\n\nItems:\n{_items_text(order)}",
        settings.ADMIN_NOTIFY_EMAIL,
        html=admin_html,
    )


def email_payment_submitted(order):
    """Customer: payment details received. Admin: verify payment (no CC)."""
    customer_html = _email_html(
        "Payment details received",
        f"Thank you, {order.name}",
        "Your order is placed. We are verifying your payment.",
        "Order ID",
        order.order_id,
        [
            ("What happens next", _p("We will check the payment and email you as soon as it is confirmed.")),
            ("Your items", _items_html(order)),
            ("Delivery address", _address_html(order)),
        ],
    )
    _send(
        f"Payment details received – {order.order_id}",
        f"Hi {order.name},\n\nThank you! Your order is placed and we received your payment details.\n\n"
        f"Order ID: {order.order_id}\nAmount: ₹{order.total:,}\n\n"
        f"Items:\n{_items_text(order)}\n\n"
        f"We are verifying the payment and will email you once it is confirmed.\n\nBigScrew Solutions",
        order.email,
        html=customer_html,
    )

    submitted_at = timezone.localtime(order.payment_submitted_at or timezone.now())
    admin_html = _email_html(
        "New customer order",
        f"New order from {order.name}",
        f"{order.company or 'Individual customer'} · ₹{order.total:,}",
        "Order ID",
        order.order_id,
        [
            (
                "Action needed",
                _p(f"{order.name} has paid ₹{order.total:,} by UPI and uploaded the payment screenshot. "
                   f"Please check the amount in your bank / UPI app, view the screenshot in the "
                   f"dashboard, then mark the order as Paid."),
            ),
            (
                "Payment",
                _rows([
                    ("Expected amount", f"₹{order.total:,}"),
                    ("Submitted at", _e(f"{submitted_at:%Y-%m-%d %H:%M %Z}")),
                    ("Status", "Waiting for your verification"),
                ]),
            ),
            (
                "Contact details",
                _rows([
                    ("Name", _e(order.name)),
                    ("Email", f'<a href="mailto:{_e(order.email)}" style="color:{BRAND_INK};">{_e(order.email)}</a>'),
                    ("Phone", _e(order.phone)),
                    ("Company", _e(order.company)),
                    ("GSTIN", _e(order.gstin)),
                ]),
            ),
            ("Items", _items_html(order)),
            ("Delivery address", _address_html(order)),
            ("Notes", _p(order.notes or "-")),
        ],
    )
    _send(
        f"New order from {order.name} – {order.order_id} – ₹{order.total:,}",
        f"{order.name} has paid ₹{order.total:,} by UPI and uploaded the payment screenshot.\n"
        f"Please check the amount in your bank/UPI app, view the screenshot in the dashboard, "
        f"then mark the order as Paid.\n\n"
        f"Order: {order.order_id}\nExpected amount: ₹{order.total:,}\n\n"
        f"Customer: {order.name} | {order.phone} | {order.email}\n"
        f"Company: {order.company} {order.gstin}\n"
        f"Address: {order.address}, {order.city}, {order.state} - {order.pincode}\n"
        f"Notes: {order.notes}\n\nItems:\n{_items_text(order)}",
        settings.ADMIN_NOTIFY_EMAIL,
        html=admin_html,
    )


def email_payment_confirmed(order):
    """Sent when the admin marks the order Paid: the 'order successful' email."""
    if order.payment_email_sent_at:
        return
    paid_at = timezone.localtime(order.paid_at or timezone.now())
    html = _email_html(
        "Payment successful",
        f"Thank you, {order.name}",
        "Your payment has been verified.",
        "Order ID",
        order.order_id,
        [
            (
                "Payment details",
                _rows([
                    ("Customer", _e(order.name)),
                    ("Amount", f"₹{order.total:,}"),
                    ("Status", "PAID"),
                    ("Payment date", _e(f"{paid_at:%Y-%m-%d %H:%M %Z}")),
                ]),
            ),
            ("Your items", _items_html(order)),
            ("What happens next", _p("We will contact you about dispatch and freight.")),
        ],
    )
    sent = _send(
        f"Payment Successful - Order #{order.order_id}",
        f"Hi {order.name},\n\n"
        f"Your payment has been verified successfully.\n\n"
        f"Customer: {order.name}\n"
        f"Order ID: {order.order_id}\n"
        f"Amount: ₹{order.total:,}\n"
        f"Payment status: PAID\n"
        f"Payment date: {paid_at:%Y-%m-%d %H:%M %Z}\n\n"
        f"Thank you for shopping with BigScrew Solutions.",
        order.email,
        html=html,
    )
    if sent:
        sent_at = timezone.now()
        Order.objects.filter(pk=order.pk, payment_email_sent_at__isnull=True).update(
            payment_email_sent_at=sent_at
        )
        order.payment_email_sent_at = sent_at


def email_dispatched(order):
    if order.dispatch_email_sent_at:
        return
    dispatched_at = timezone.localtime(order.dispatched_at or timezone.now())
    html = _email_html(
        "Order dispatched",
        "Your order is on its way",
        f"Hi {order.name}, your order has been dispatched.",
        "Order ID",
        order.order_id,
        [
            (
                "Shipping details",
                _rows([
                    ("Dispatch date", _e(f"{dispatched_at:%Y-%m-%d %H:%M %Z}")),
                    ("Courier", _e(order.courier or "Not provided")),
                    ("Tracking no.", _e(order.tracking_no or "Not provided")),
                ]),
            ),
            ("Your items", _items_html(order)),
            ("Delivery address", _address_html(order)),
        ],
    )
    sent = _send(
        f"Your Order #{order.order_id} Has Been Dispatched",
        f"Hi {order.name},\n\n"
        f"Your order {order.order_id} has been dispatched.\n"
        f"Dispatch date: {dispatched_at:%Y-%m-%d %H:%M %Z}\n"
        f"Courier: {order.courier or 'Not provided'}\n"
        f"Tracking number: {order.tracking_no or 'Not provided'}\n\n"
        f"BigScrew Solutions",
        order.email,
        html=html,
    )
    if sent:
        sent_at = timezone.now()
        Order.objects.filter(pk=order.pk, dispatch_email_sent_at__isnull=True).update(
            dispatch_email_sent_at=sent_at
        )
        order.dispatch_email_sent_at = sent_at


def email_order_cancelled(order):
    """Sent when the admin cancels an order."""
    refund_note = (
        "If you have already paid, we will contact you shortly about your refund."
        if order.payment_submitted_at
        else "No payment was received for this order."
    )
    html = _email_html(
        "Order cancelled",
        f"Hi {order.name}",
        "Your order has been cancelled.",
        "Order ID",
        order.order_id,
        [
            ("Details", _rows([("Order amount", f"₹{order.total:,}")])),
            ("Refund", _p(refund_note)),
            ("Questions?", _p("Reply to this email and our team will help you.")),
        ],
    )
    _send(
        f"Order Cancelled - {order.order_id}",
        f"Hi {order.name},\n\n"
        f"Your order {order.order_id} (₹{order.total:,}) has been cancelled.\n\n"
        f"{refund_note}\n\n"
        f"If you have any questions, please reply to this email.\n\n"
        f"BigScrew Solutions",
        order.email,
        html=html,
    )


def email_low_stock(product):
    """Admin alert: stock has dropped below LOW_STOCK_LIMIT."""
    html = _email_html(
        "Low stock alert",
        f"{product.name} is running low",
        f"You have less than {LOW_STOCK_LIMIT} pieces in stock.",
        "Stock left",
        f"{product.stock} pieces",
        [
            (
                "Action needed",
                _p(f"Stock for '{product.name}' is now {product.stock} pieces, "
                   f"below the limit of {LOW_STOCK_LIMIT}. Please restock soon."),
            ),
            (
                "Product",
                _rows([
                    ("Name", _e(product.name)),
                    ("Current stock", _e(product.stock)),
                    ("Alert limit", _e(LOW_STOCK_LIMIT)),
                ]),
            ),
        ],
    )
    _send(
        f"Low stock: {product.name} ({product.stock} left)",
        f"Hello,\n\nYou have less than {LOW_STOCK_LIMIT} pieces of '{product.name}' in stock.\n"
        f"Current stock: {product.stock}\n\nPlease restock soon.\n\nBigScrew Solutions",
        settings.ADMIN_NOTIFY_EMAIL,
        html=html,
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
        # includes payment_screenshot automatically (full URL because the request is in context)
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
        low_stock = {}  # products that just dropped below the limit

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
                # p.stock is the locked value from before this order
                if p.stock >= LOW_STOCK_LIMIT > p.stock - qty:
                    low_stock[p.pk] = p

        # email customer + admin now that the order is saved (errors are swallowed by _send)
        email_order_created(order)

        # low-stock alert to admin (only when stock just crossed below the limit)
        for p in low_stock.values():
            p.refresh_from_db(fields=["stock"])
            email_low_stock(p)

        # the payment page fetches QR + amount from /orders/status/ using this token
        return Response({"order_id": order.order_id, "public_token": order.public_token}, status=201)


class SubmitPaymentView(APIView):
    """Step 2: customer has paid in their UPI app and uploads the payment screenshot."""
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [AnonRateThrottle]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def post(self, request):
        order_id = request.data.get("order_id", "")
        token = request.data.get("public_token", "")
        shot = request.FILES.get("screenshot")

        # The screenshot is what the admin verifies, so it is required.
        if not shot:
            return Response({"detail": "Upload your payment screenshot."}, status=400)
        if shot.size > 5 * 1024 * 1024 or not (shot.content_type or "").startswith("image/"):
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
                # Placeholder keeps the existing (unique) utr column valid.
                order.utr = f"NA-{order.order_id}"
                order.payment_screenshot = shot
                order.status = Order.Status.PAYMENT_SUBMITTED
                order.payment_submitted_at = timezone.now()
                order.save()
        except IntegrityError:
            return Response({"detail": "Could not submit payment. Please try again."}, status=400)

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

    def perform_create(self, serializer):
        product = serializer.save()
        if product.stock < LOW_STOCK_LIMIT:
            email_low_stock(product)

    def perform_update(self, serializer):
        old_stock = serializer.instance.stock
        product = serializer.save()
        # alert only when stock crosses below the limit, not on every save
        if old_stock >= LOW_STOCK_LIMIT > product.stock:
            email_low_stock(product)


class AdminOrderList(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = OrderSerializer
    # pending orders (form filled, payment not yet submitted) show too,
    # so the admin can see customer details as soon as the order is placed.
    queryset = Order.objects.prefetch_related("items").order_by("-created_at")


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
            # Double click or stale list: the order is already in that status.
            # Return it as-is (no error, no duplicate emails or stock changes).
            if new == order.status:
                return Response(OrderSerializer(order, context={"request": request}).data)
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
        if new == S.CANCELLED:
            email_order_cancelled(order)
        return Response(OrderSerializer(order, context={"request": request}).data)