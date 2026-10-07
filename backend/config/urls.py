from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include

urlpatterns = [
    path("", lambda request: JsonResponse({"status": "ok"})),
    path("admin/", admin.site.urls),
    path("api/", include("shop.urls")),
]

# Serve uploaded payment screenshots at /media/... (works when DEBUG = True)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)