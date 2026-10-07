import secrets
from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField(help_text="₹ per piece, excluding GST")
    stock = models.PositiveIntegerField(default=0)
    min_order_qty = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name) or "product"
            slug, n = base, 1
            while Product.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                n += 1
                slug = f"{base}-{n}"
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


def new_order_id():
    return f"BS{timezone.now():%y%m%d}{secrets.token_hex(3).upper()}"


def new_public_token():
    return secrets.token_urlsafe(24)


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Waiting for payment"
        PAYMENT_SUBMITTED = "payment_submitted", "Verify payment"  # customer uploaded screenshot
        PAID = "paid", "Paid"                                       # admin verified in bank app
        DISPATCHED = "dispatched", "Dispatched"
        CANCELLED = "cancelled", "Cancelled"

    order_id = models.CharField(max_length=20, unique=True, default=new_order_id)
    # secret known only to the customer's browser; required to submit the payment
    public_token = models.CharField(max_length=64, default=new_public_token, editable=False)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    company = models.CharField(max_length=160, blank=True)
    gstin = models.CharField(max_length=20, blank=True)
    address = models.TextField()
    city = models.CharField(max_length=80)
    state = models.CharField(max_length=80)
    pincode = models.CharField(max_length=10)
    notes = models.TextField(blank=True)

    subtotal = models.PositiveIntegerField()
    gst = models.PositiveIntegerField()
    total = models.PositiveIntegerField()  # rupees, incl. GST

    # unique: the same UTR can never be used on two orders
    utr = models.CharField(max_length=22, null=True, blank=True, unique=True)

    # NEW: payment proof uploaded by the customer (shown in the admin dashboard)
    payment_screenshot = models.ImageField(upload_to="payments/", null=True, blank=True)

    courier = models.CharField(max_length=80, blank=True)
    tracking_no = models.CharField(max_length=80, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    payment_submitted_at = models.DateTimeField(null=True, blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    dispatched_at = models.DateTimeField(null=True, blank=True)
    payment_email_sent_at = models.DateTimeField(null=True, blank=True)
    dispatch_email_sent_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_id


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    # SET_NULL so deleting a product never deletes order history
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=200)   # snapshot
    price = models.PositiveIntegerField()     # snapshot
    quantity = models.PositiveIntegerField()