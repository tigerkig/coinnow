import random
import string
from django.db import models
from datetime import datetime

from backend.categories.models import Category

def upload_to(instance, filename):
    return 'images/products/{filename}'.format(filename=''.join(random.choices(string.ascii_lowercase + string.ascii_uppercase, k=30)))


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    current_price = models.IntegerField()
    minimum_price = models.IntegerField()
    maximum_price = models.IntegerField()
    quantity = models.IntegerField()
    auto_stock_amount = models.IntegerField()
    price_change_amount = models.IntegerField()
    auto_quantity_change = models.IntegerField(default=100)

class ProductPriceHistory(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    updated_current_price = models.IntegerField()
    created_at = models.DateTimeField(default=datetime.now())

    def save(self, *args, **kwargs):
        price = Product.objects.values('current_price').filter(id=self.product_id)
        current_price = price[0]['current_price']

        if current_price != self.updated_current_price:
            super(ProductPriceHistory, self).save(*args, **kwargs)