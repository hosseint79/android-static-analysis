from datetime import datetime
from unittest import result
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from myproject.leak.apkleaks.cli import main
from  db.models import Project, Rule
import json
from django.core.paginator import Paginator
from django.core import serializers

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

    scanResult = main("files/" + request.GET.get("fileName"))

    createResult = Project.objects.create(
        fileName= request.GET.get("fileName"),
        problemsList= scanResult[0],
        appInfo=scanResult[1],
        createDate=datetime.today().strftime('%Y-%m-%d')
    )

    return JsonResponse({
        "result":createResult.id,
    })

@csrf_exempt 
def project_list(request):

    allProject = Project.objects.all().values()
    return JsonResponse({
        "result":list(allProject),
    })

@csrf_exempt 
def rules_list(request):

    allRules = Rule.objects.all().values()

    return JsonResponse({
        "result":list(allRules),
    })

@csrf_exempt 
def scan_details(request):
    getData = Project.objects.get(id=request.GET.get("id"))
    page = request.GET.get("page")
    step = request.GET.get("step")

    
    getRules = Rule.objects.all()

    i = getData.problemsList
    newarr = []
    for item in i["results"] :
        

        for match in item["matches"] :
            temp = match
            pass

            for rule in getRules:
                if rule.title == item["name"]:
                    temp["description"] = rule.description
                    temp["severity"] =  rule.severity    
                    temp["name"] =  item["name"]  
                    temp["persianTitle"] =  rule.persianTitle


            newarr.append(temp)

    p = Paginator(newarr, step)


    return JsonResponse({
        "result":p.page(page).object_list,
        "pageCount": p.num_pages,
        "appInfo":getData.appInfo,
        "createDate":getData.createDate
    })

@csrf_exempt 
def app_info(request):
    getData = Project.objects.get(id=request.GET.get("id"))

    return JsonResponse({
        "appInfo":getData.appInfo,
        "createDate":getData.createDate
    })