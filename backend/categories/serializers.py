from rest_framework import serializers

from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Category
        fields = ['id', 'name', 'image_url']
