import logging
from django.conf import settings
from django.core.mail import send_mail

log = logging.getLogger(__name__)


def _rs(n):
    return f"Rs {n:,}"


def _items_text(order):
    return "\n".join(
        f"  - {i.name} x {i.quantity}  =  {_rs(i.price * i.quantity)}" for i in order.items.all()
    )


def _send(subject, body, to):
    try:
        send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [to], fail_silently=False)
    except Exception:
        # Never let an email problem break the order flow
        log.exception("Email to %s failed", to)


def send_payment_emails(order):
    """Customer + admin, when the customer submits payment."""
    _send(
        f"We received your payment details - Order {order.order_id}",
        f"Hi {order.name},\n\n"
        f"Thank you for your order. We have received your payment details "
        f"(UTR: {order.utr}) and will confirm shortly.\n\n"
        f"Order: {order.order_id}\n{_items_text(order)}\n\n"
        f"Total: {_rs(order.total)}\n\n"
        f"Delivery to:\n{order.address}, {order.city}, {order.state} - {order.pincode}\n\n"
        f"Freight charges will be confirmed separately.\n\n- BigScrew",
        order.email,
    )
    _send(
        f"[New order] {order.order_id} - {_rs(order.total)} - verify payment",
        f"A customer has submitted payment. Verify it in your bank app, "
        f"then mark it Paid in the dashboard.\n\n"
        f"Order: {order.order_id}\nUTR: {order.utr}\nTotal: {_rs(order.total)}\n\n"
        f"Customer: {order.name}\nPhone: {order.phone}\nEmail: {order.email}\n"
        f"Company: {order.company or '-'}   GSTIN: {order.gstin or '-'}\n\n"
        f"Items:\n{_items_text(order)}\n\n"
        f"Address: {order.address}, {order.city}, {order.state} - {order.pincode}\n"
        f"Notes: {order.notes or '-'}",
        settings.ADMIN_EMAIL,
    )


def send_payment_confirmed_email(order):
    """Customer, when admin marks the order paid."""
    _send(
        f"Payment confirmed - Order {order.order_id}",
        f"Hi {order.name},\n\nYour payment of {_rs(order.total)} for order "
        f"{order.order_id} is confirmed. We will contact you about dispatch "
        f"and freight.\n\n- BigScrew",
        order.email,
    )
