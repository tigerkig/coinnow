from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics
from .models import ProductUserRelation, SellHistory, BuyHistory
from backend.products.models import Product
from backend.users.models import User
from django.http import JsonResponse
from django.db.models import Q
from . import serializers

@api_view(['POST'])
def ProductUserRelationClass(request):
     requestData = request.data
     request.data._mutable = True
     requestData['product'] = request.data['product_id']
     requestData['user'] = request.data['user_id']
     serializer = serializers.ProductUserRelationSerializer(data=requestData)

     price = Product.objects.values('current_price').filter(id=request.data['product_id'])
     userInfo = User.objects.values('balance').filter(id=request.data['user_id'])
     current_price = price[0]['current_price']
     balance = userInfo[0]['balance']

     if serializer.is_valid():
          if current_price * int(request.data['quantity']) <= balance:
               serializer.save()
               response = {
                    'status': True,
                    'msg': 'New data created successfully'
               }
          else:
               response = {
                    'status': False,
                    'msg': 'This user does not have enough balance.'
               }
     else:
          response = {
                    'status': False,
                    'msg': serializer.errors
               }
     return JsonResponse(response, safe=False)

@api_view(['POST'])
def SellHistoryClass(request):
     requestData = request.data
     request.data._mutable = True
     requestData['product'] = request.data['product_id']
     requestData['user'] = request.data['user_id']
     serializer = serializers.SellHistorySerializer(data=request.data)
     if serializer.is_valid():
          serializer.save()
          response = {
               'status': True,
               'msg': 'New data created successfully'
          }
     else:
          response = {
                    'status': False,
                    'msg': serializer.errors
               }
     return JsonResponse(response, safe=False)

@api_view(['POST'])
def BuyHistoryClass(request):
     requestData = request.data
     request.data._mutable = True
     requestData['product'] = request.data['product_id']
     requestData['user'] = request.data['user_id']
     serializer = serializers.BuyHistorySerializer(data=request.data)
     if serializer.is_valid():
          serializer.save()
          response = {
               'status': True,
               'msg': 'New data created successfully'
          }
          return JsonResponse(response, safe=False)
     response = {
               'status': False,
               'msg': serializer.errors
          }
     return JsonResponse(response, safe=False)

class ProductUserRelationDetailAPIView(generics.ListCreateAPIView):
     serializer_class = serializers.ProductByIdSerializer
     def get_queryset(self):
          user_id = self.request.GET['user_id']
          return ProductUserRelation.objects.filter(user_id=user_id)

class SellHistoryDetailAPIView(generics.ListCreateAPIView):
     serializer_class = serializers.SellHistorySerializer
     def get_queryset(self):
          user_id = self.request.GET['user_id']
          return SellHistory.objects.filter(user_id=user_id)

class BuyHistoryDetailAPIView(generics.ListCreateAPIView):
     serializer_class = serializers.BuyHistorySerializer
     def get_queryset(self):
          user_id = self.request.GET['user_id']
          return BuyHistory.objects.filter(user_id=user_id)

class ProductGetById(APIView):

     def get(self, request):
          query = Q()
          user_id = request.query_params.get('user_id', None)
          if user_id is not None:
               query &= Q(user_id=user_id)
          
          product_id = request.query_params.get('product_id', None)
          if product_id is not None:
               query &= Q(product_id=product_id)

          queryset = ProductUserRelation.objects.filter(query)
          serializer = serializers.ProductByIdSerializer(queryset, many=True)
          return JsonResponse(serializer.data, safe=False)

class SellHistoryGetById(APIView):

     def get(self, request):
          query = Q()
          user_id = request.query_params.get('user_id', None)
          if user_id is not None:
               query &= Q(user_id=user_id)
          
          product_id = request.query_params.get('product_id', None)
          if product_id is not None:
               query &= Q(product_id=product_id)

          queryset = SellHistory.objects.filter(query)
          serializer = serializers.SellHistoryByIdSerializer(queryset, many=True)
          return JsonResponse(serializer.data, safe=False)

class BuyHistoryGetById(APIView):

     def get(self, request):
          query = Q()
          user_id = request.query_params.get('user_id', None)
          if user_id is not None:
               query &= Q(user_id=user_id)
          
          product_id = request.query_params.get('product_id', None)
          if product_id is not None:
               query &= Q(product_id=product_id)

          queryset = BuyHistory.objects.filter(query)
          serializer = serializers.BuyHistoryByIdSerializer(queryset, many=True)
          return JsonResponse(serializer.data, safe=False)
