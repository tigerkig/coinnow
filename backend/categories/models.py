from django.db import models


def upload_to(instance, filename):
    return 'images/categories/{filename}'.format(filename=filename)


class Category(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
