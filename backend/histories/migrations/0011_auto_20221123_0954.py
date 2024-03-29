# Generated by Django 3.2.8 on 2022-11-23 00:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('histories', '0010_auto_20221123_0924'),
    ]

    operations = [
        migrations.AddField(
            model_name='sellhistory',
            name='hold_time',
            field=models.BigIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='buyhistory',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 23, 9, 53, 52, 410930)),
        ),
        migrations.AlterField(
            model_name='productuserrelation',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 23, 9, 53, 52, 417305)),
        ),
        migrations.AlterField(
            model_name='sellhistory',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 23, 9, 53, 52, 413860)),
        ),
    ]
