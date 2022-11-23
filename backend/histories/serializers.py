from .models import ProductUserRelation, SellHistory, BuyHistory
from backend.products.models import Product
from backend.users.models import User
from rest_framework import serializers
from backend.products.serializers import ProductSerializer
from backend.users.serializers import UserSerializer

class ProductUserRelationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductUserRelation
        fields = ['id', 'quantity', 'product', 'user', 'listViewIsTrue', 'created_at']

class SellHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SellHistory
        fields = ['id', 'product_price', 'total_amount', 'quantity', 'created_at', 'product', 'user', 'hold_time']

class BuyHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyHistory
        fields = ['id', 'product_price', 'total_amount', 'quantity', 'created_at', 'product', 'user']

class ProductByIdSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    user = UserSerializer()
    class Meta:
        model = ProductUserRelation
        fields = ['id', 'quantity', 'product', 'user', 'listViewIsTrue', 'created_at']

class SellHistoryByIdSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    user = UserSerializer()
    class Meta:
        model = SellHistory
        fields = ['id', 'product_price', 'total_amount', 'quantity', 'created_at', 'product', 'user', 'hold_time']

class BuyHistoryByIdSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    user = UserSerializer()
    class Meta:
        model = BuyHistory
        fields = ['id', 'product_price', 'total_amount', 'quantity', 'created_at', 'product', 'user']
