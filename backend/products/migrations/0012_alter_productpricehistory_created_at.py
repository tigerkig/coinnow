# Generated by Django 3.2.8 on 2022-11-23 00:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0011_alter_productpricehistory_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productpricehistory',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 23, 9, 24, 3, 723294)),
        ),
    ]
