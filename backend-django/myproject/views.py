from unittest import result
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from myproject.leak.apkleaks.cli import main
from  db.models import Project
import json


@csrf_exempt 
def upload_file(request):
    if request.method == 'POST':
        file = request.FILES['file'] # this is my file

        folder='files/'
        fs = FileSystemStorage(location=folder) #defaults to   MEDIA_ROOT  
        filename = fs.save(file.name, file)
        file_url = fs.url(filename)
        return JsonResponse({
            "status":"200",
            "fileName":filename,
            "fileUrl":file_url
        })
    else:
        return JsonResponse({
            "status":"404",
         })


@csrf_exempt 
def scan(request):
    data1 = [{
        "name":"ali"
    },{
        "name":"ali"
    }]
    # scan file for generate

    final = main("files/" + request.GET.get("fileName"))


    Project.objects.create(
        fileName="files/" + request.GET.get("fileName"),
        problemsList=final
    )

    return JsonResponse({
            "result":final,
         })