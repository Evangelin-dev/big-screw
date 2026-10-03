from django.contrib import admin
from .models import Order, OrderItem, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "price", "stock", "is_active"]
    list_editable = ["price", "stock", "is_active"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name", "slug"]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["order_id", "name", "total", "status", "utr", "created_at"]
    list_filter = ["status"]
    search_fields = ["order_id", "name", "phone", "email", "utr"]
    inlines = [OrderItemInline]
