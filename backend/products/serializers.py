from rest_framework import serializers

from .models import Product, ProductPriceHistory


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'image_url', 'current_price', 'minimum_price',
                  'maximum_price', 'quantity', 'auto_stock_amount', 'price_change_amount', 'category_id', 'auto_quantity_change']

class ProductPriceHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductPriceHistory
        fields = '__all__'