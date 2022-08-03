from django.db import models

# Create your models here.
class Project(models.Model):
    createDate= models.DateField(null=True)
    description= models.CharField(null=True,max_length=500)
    problemsList= models.JSONField(null=True)
    fileName=models.CharField(null=True,max_length=200)

