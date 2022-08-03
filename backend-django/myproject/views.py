from django.shortcuts import render
from django.http import HttpRequest, HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage

@csrf_exempt 
def upload_file(request):
    if request.method == 'POST':
        file = request.FILES['myfile'] # this is my file

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



def say_hello(request):
    return HttpResponse("salam salar")