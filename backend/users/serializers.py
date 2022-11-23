from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    profile_img = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['id', 'fullname', 'username', 'password', 'balance', 'phone_number', 'profile_img']
