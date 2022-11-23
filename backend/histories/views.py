from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics
from .models import ProductUserRelation, SellHistory, BuyHistory
from django.db.models import Sum, Avg, Count
from backend.products.models import Product
from backend.users.models import User
from django.http import JsonResponse
from django.db.models import Q
from . import serializers
import datetime, time

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
     total_price = current_price * int(request.data['quantity'])

     if serializer.is_valid():
          if total_price <= balance:
               serializer.save()
               user_balance = balance - total_price
               userObj = User.objects.get(id=request.data['user_id'])
               userObj.balance = user_balance
               userObj.save()
               response = {
                    'status': True,
                    'msg': 'New data created successfully'
               }
          else:
               response = {
                    'status': False,
                    'msg': 'You have not enough balance.'
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

class ProductUserRelationListView(generics.RetrieveUpdateDestroyAPIView):
     queryset = ProductUserRelation.objects.all()
     serializer_class = serializers.ProductUserRelationSerializer

     def perform_update(self, serializer):
          serializer.save(listViewIsTrue=True)

class MarketplaceListView(APIView):

     def get(self, request):
          queryset = ProductUserRelation.objects.all().filter(listViewIsTrue=True)
          serializer = serializers.ProductByIdSerializer(queryset, many=True)

          return JsonResponse(serializer.data, safe=False)

class BuyProduct(APIView):

     #pls use form data with POST method
     def post(self, request):
          requestData = request.data
          request.data._mutable = True
          requestData['product'] = request.data['product_id']

          buyUserDetail = User.objects.values('balance').filter(id=request.data['buy_user_id'])
          buyBalance = buyUserDetail[0]['balance']
          quantity = float(request.data['quantity'])
          product_price = float(request.data['product_price'])

          if quantity * product_price <= buyBalance:
               updateBuyBalance = buyBalance - quantity * product_price
               requestData['user'] = request.data['buy_user_id']
               requestData['total_amount'] = updateBuyBalance
               buySerializer = serializers.BuyHistorySerializer(data=requestData)
               
               if buySerializer.is_valid():
                    buySerializer.save()
                    buyObj = User.objects.get(id=request.data['buy_user_id'])
                    buyObj.balance = updateBuyBalance
                    buyObj.save()
                    response = { 'status': True, 'msg': 'New data created successfully' }
               else:
                    response = { 'status': False, 'msg': buySerializer.errors }
               now = int(time.mktime(datetime.datetime.strptime(str(datetime.datetime.now()), "%Y-%m-%d %H:%M:%S.%f").timetuple()))
               buy_date = int(time.mktime(datetime.datetime.strptime(request.data['buy_date'], "%Y-%m-%dT%H:%M:%S.%fZ").timetuple()))
               differentSecond = now - buy_date
               sellUserDetail = User.objects.values('balance').filter(id=request.data['sell_user_id'])
               sellBalance = sellUserDetail[0]['balance']
               updateSellBalance = sellBalance + quantity * product_price
               requestData['user'] = request.data['sell_user_id']
               requestData['total_amount'] = updateSellBalance
               requestData['hold_time'] = differentSecond * 1000
               sellSerializer = serializers.SellHistorySerializer(data=requestData)

               if sellSerializer.is_valid():
                    
                    sellSerializer.save()
                    sellObj = User.objects.get(id=request.data['sell_user_id'])
                    sellObj.balance = updateSellBalance
                    sellObj.save()
                    productRelationObj = ProductUserRelation.objects.get(id=request.data['product_user_relation_id'])
                    productRelationObj.listViewIsTrue = False
                    productRelationObj.user_id = request.data['sell_user_id']
                    productRelationObj.save()
                    response = { 'status': True, 'msg': 'New data created successfully' }
               else:
                    response = { 'status': False, 'msg': sellSerializer.errors }

          else:
               response = {
                    'status': False,
                    'msg': 'You have not enough balance.'
               }
          return JsonResponse(response, safe=False)
          
class GetProductListById(APIView):

     #pls use form data with GET mothod
     def post(self, request):
          user_id = request.data['user_id']
          sellQueryset = SellHistory.objects.filter(user_id=user_id).order_by('-created_at')
          sellSerializer = serializers.SellHistoryByIdSerializer(sellQueryset, many=True)
          buyQueryset = BuyHistory.objects.filter(user_id=user_id).order_by('-created_at')
          buySerializer = serializers.BuyHistoryByIdSerializer(buyQueryset, many=True)

          response = {
               'status': True,
               'sellList': sellSerializer.data,
               'buyList': buySerializer.data,
          }
          return JsonResponse(response, safe=False)

class GetProductDetailInfo(APIView):
     
     def post(self, request):
          product_id = request.data['product_id']
          total_quantity = ProductUserRelation.objects.filter(product_id=product_id).aggregate(Sum('quantity'))['quantity__sum']
          holdTime_average = SellHistory.objects.filter(product_id=product_id).aggregate(Avg('hold_time'))['hold_time__avg']
          sorted_list = list(SellHistory.objects.values('product_id').annotate(total_price=Sum('quantity')).order_by('-total_price'))
          raking_quantity = next((i for i, item in enumerate(sorted_list) if item['product_id'] == int(request.data['product_id'])), -1)

          response = {
               'status': True,
               'total_quantity': total_quantity,
               'holdTime_average': holdTime_average,
               'raking_quantity': raking_quantity + 1
          }
          return JsonResponse(response, safe=False)

