import random
import string
from django.db import models

# Create your models here.


def upload_to(instance, filename):
    return 'images/profiles/{filename}'.format(filename=''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase, k=30)))


class User(models.Model):
    fullname = models.CharField(max_length=60)
    username = models.CharField(max_length=60, unique=True)
    password = models.TextField()
    balance = models.FloatField()
    phone_number = models.DecimalField(max_digits=20, decimal_places=0)
    profile_img = models.ImageField(upload_to=upload_to, blank=True, null=True)
