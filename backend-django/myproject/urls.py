from django.contrib import admin
from django.urls import path
from myproject.views import upload_file , scan , scan_details,project_list,rules_list ,app_info

urlpatterns = [
    path('admin/', admin.site.urls),
    path('upload/', upload_file),
    path('scan/', scan),
    path('scan-detail/', scan_details),
    path('app-info/', app_info),

    path('project-list/', project_list),   
    path('rules-list/', rules_list),   

]
