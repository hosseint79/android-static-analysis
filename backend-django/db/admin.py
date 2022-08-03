from django.contrib import admin

from db import models
from .models import Project , Rule
from django.contrib import admin 

# Register your models here.

admin.site.register(Project)
admin.site.register(Rule)
