# Generated by Django 4.0.6 on 2022-08-12 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0006_rule_persiantitle'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='appInfo',
            field=models.JSONField(null=True),
        ),
    ]