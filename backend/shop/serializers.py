from rest_framework import serializers
from .models import Product, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "slug", "name", "description", "image_url", "price", "stock", "is_active"]


class ItemInputSerializer(serializers.Serializer):
    slug = serializers.CharField()
    quantity = serializers.IntegerField(min_value=1, max_value=10000)


class CustomerInputSerializer(serializers.Serializer):
    name = serializers.CharField(min_length=2, max_length=100)
    phone = serializers.RegexField(r"^[6-9]\d{9}$")
    email = serializers.EmailField()
    company = serializers.CharField(required=False, allow_blank=True, default="", max_length=200)
    gstin = serializers.RegexField(
        r"^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$",
        required=False, allow_blank=True, default="",
    )
    address = serializers.CharField(min_length=8, max_length=500)
    city = serializers.CharField(min_length=2, max_length=100)
    state = serializers.CharField(min_length=2, max_length=100)
    pincode = serializers.RegexField(r"^\d{6}$")
    notes = serializers.CharField(required=False, allow_blank=True, default="", max_length=1000)


class OrderCreateSerializer(serializers.Serializer):
    items = ItemInputSerializer(many=True, allow_empty=False)
    customer = CustomerInputSerializer()


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["name", "price", "quantity"]


class PublicOrderSerializer(serializers.ModelSerializer):
    """What the payment page may see (no customer details)."""
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["order_id", "status", "total", "created_at", "items"]


class AdminOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", "order_id", "status", "total", "utr",
            "name", "phone", "email", "company", "gstin",
            "address", "city", "state", "pincode", "notes",
            "created_at", "paid_at", "items",
        ]
        read_only_fields = fields
