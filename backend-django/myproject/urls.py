from django.contrib import admin
from django.urls import path
from myproject.views import upload_file , scan , scan_details

urlpatterns = [
    path('admin/', admin.site.urls),
    path('upload/', upload_file),
    path('scan/', scan),
    path('scan-detail/', scan_details),
]
