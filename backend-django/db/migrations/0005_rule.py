# Generated by Django 4.0.6 on 2022-08-03 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0004_rename_result_project_problemslist'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500)),
                ('description', models.CharField(max_length=500, null=True)),
                ('severity', models.CharField(max_length=100, null=True)),
                ('Regex', models.CharField(max_length=700, null=True)),
            ],
        ),
    ]
