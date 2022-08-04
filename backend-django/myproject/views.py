from unittest import result
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from myproject.leak.apkleaks.cli import main
from  db.models import Project, Rule
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
    i = main("files/" + request.GET.get("fileName"))

    Project.objects.create(
        fileName= request.GET.get("fileName"),
        problemsList=i 
    )

    return JsonResponse({
        "result":i,
    })

@csrf_exempt 
def scan_details(request):
    getData = Project.objects.get(id=request.GET.get("id"))
    getRules = Rule.objects.all()

    i = getData.problemsList
    newarr = []
    for item in i["results"] :
        temp = item
        for rule in getRules:
            if rule.title == item["name"]:
                temp["description"] = rule.description
                temp["severity"] =  rule.severity         
        newarr.append(temp)


    return JsonResponse({
        "result":newarr,
    })