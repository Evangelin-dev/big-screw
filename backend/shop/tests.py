import smtplib
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.core import mail
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from .models import Order


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
    ADMIN_EMAIL="bigscrew26@gmail.com",
)
class OrderNotificationTests(TestCase):
    def setUp(self):
        self.admin = get_user_model().objects.create_user(
            username="admin",
            password="test-password",
            is_staff=True,
        )
        self.client = APIClient()
        self.client.force_authenticate(self.admin)
        self.order = Order.objects.create(
            order_id="BS261006ABC123",
            status=Order.Status.PAYMENT_SUBMITTED,
            name="Customer Name",
            email="customer@example.com",
            phone="9999999999",
            address="1 Main Street",
            city="Mumbai",
            state="Maharashtra",
            pincode="400001",
            subtotal=1200,
            gst=0,
            total=1200,
        )

    def update_order(self, **payload):
        return self.client.patch(
            f"/api/admin/orders/{self.order.pk}/",
            payload,
            format="json",
        )

    def test_verified_payment_sends_single_cc_email(self):
        response = self.update_order(status=Order.Status.PAID)

        self.assertEqual(response.status_code, 200)
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, Order.Status.PAID)
        self.assertIsNotNone(self.order.payment_email_sent_at)
        self.assertEqual(len(mail.outbox), 1)
        message = mail.outbox[0]
        self.assertEqual(message.subject, f"Payment Successful - Order #{self.order.order_id}")
        self.assertEqual(message.to, ["customer@example.com"])
        self.assertEqual(message.cc, ["bigscrew26@gmail.com,monisha@botdigitalsolutions.com"])
        self.assertIn("Customer: Customer Name", message.body)
        self.assertIn("Amount: ₹1,200", message.body)
        self.assertIn("Payment status: PAID", message.body)
        self.assertIn("Payment date:", message.body)

        duplicate = self.update_order(status=Order.Status.PAID)
        self.assertEqual(duplicate.status_code, 400)
        self.assertEqual(len(mail.outbox), 1)

    def test_dispatch_sends_single_cc_email_with_tracking(self):
        self.update_order(status=Order.Status.PAID)
        mail.outbox.clear()

        response = self.update_order(
            status=Order.Status.DISPATCHED,
            courier="Fast Courier",
            tracking_no="TRACK123",
        )

        self.assertEqual(response.status_code, 200)
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, Order.Status.DISPATCHED)
        self.assertIsNotNone(self.order.dispatch_email_sent_at)
        self.assertEqual(len(mail.outbox), 1)
        message = mail.outbox[0]
        self.assertEqual(
            message.subject,
            f"Your Order #{self.order.order_id} Has Been Dispatched",
        )
        self.assertEqual(message.to, ["customer@example.com"])
        self.assertEqual(message.cc, ["bigscrew26@gmail.com"])
        self.assertIn("Dispatch date:", message.body)
        self.assertIn("Courier: Fast Courier", message.body)
        self.assertIn("Tracking number: TRACK123", message.body)

        duplicate = self.update_order(status=Order.Status.DISPATCHED)
        self.assertEqual(duplicate.status_code, 400)
        self.assertEqual(len(mail.outbox), 1)

    @patch("shop.views.EmailMessage.send", side_effect=smtplib.SMTPException("SMTP unavailable"))
    def test_smtp_failure_does_not_revert_verified_payment(self, send_mock):
        with self.assertLogs("shop.views", level="ERROR"):
            response = self.update_order(status=Order.Status.PAID)

        self.assertEqual(response.status_code, 200)
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, Order.Status.PAID)
        self.assertIsNone(self.order.payment_email_sent_at)
        send_mock.assert_called_once()

    def test_smtp_failure_does_not_revert_dispatch(self):
        paid_response = self.update_order(status=Order.Status.PAID)
        self.assertEqual(paid_response.status_code, 200)
        mail.outbox.clear()

        with patch(
            "shop.views.EmailMessage.send",
            side_effect=smtplib.SMTPException("SMTP unavailable"),
        ) as send_mock:
            with self.assertLogs("shop.views", level="ERROR"):
                response = self.update_order(status=Order.Status.DISPATCHED)

        self.assertEqual(response.status_code, 200)
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, Order.Status.DISPATCHED)
        self.assertIsNone(self.order.dispatch_email_sent_at)
        send_mock.assert_called_once()
