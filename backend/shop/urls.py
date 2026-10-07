from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("admin/products", views.AdminProductViewSet, basename="admin-products")

urlpatterns = [
    path("products/", views.PublicProductList.as_view()),
    path("orders/", views.CreateOrderView.as_view()),
    path("orders/pay/", views.SubmitPaymentView.as_view()),
    path("orders/status/", views.PaymentStatusView.as_view()),  # was missing
    path("admin/login/", views.AdminLoginView.as_view()),
    path("admin/orders/", views.AdminOrderList.as_view()),
    path("admin/orders/<int:pk>/", views.AdminOrderUpdate.as_view()),
] + router.urls  # was router.url (typo)