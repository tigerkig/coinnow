from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser

from .models import User
from .serializers import UserSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    parser_classes = (MultiPartParser, FormParser)

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserLogin(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        username = self.request.GET['username']
        password = self.request.GET['password']

        return User.objects.values().filter(username=username, password=password)


