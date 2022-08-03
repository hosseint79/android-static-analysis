from django.contrib import admin

from db import models
from .models import Project
from django.contrib import admin

# Register your models here.

admin.site.register(Project)