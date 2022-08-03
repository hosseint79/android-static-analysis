from django.contrib import admin
from django.urls import path
from myproject.views import upload_file , scan

urlpatterns = [
    path('upload/', upload_file),
    path('scan/', scan),
]
