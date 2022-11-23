from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .models import Product, ProductPriceHistory
from .serializers import ProductSerializer, ProductPriceHistorySerializer
from django.http import JsonResponse


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        serializer.save(category_id=self.request.POST['category_id'])


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_update(self, serializer):
        serializer.save(category_id=self.request.POST['category_id'])

class GetProductDetailById(APIView):

    #pls send with query param
    def get(self, request):
        category_id = request.query_params.get('category_id', None)
        queryset = Product.objects.filter(category_id=category_id)
        serializer = ProductSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

class UpdateCurrentPriceById(APIView):

    #pls send with form data
    def post(self, request):
        requestData = request.data
        request.data._mutable = True
        requestData['product'] = request.data['product_id']
        serializer = ProductPriceHistorySerializer(data=requestData)

        if serializer.is_valid():
            serializer.save()
            response = {
                'status': 'success',
                'msg': 'New data created successfully'
            }
            return JsonResponse(response, safe=False)
        
        return JsonResponse(serializer.errors, safe=False)

class LatestProductPriceById(APIView):
    
    #pls send with form data
    def post(self, request):
        product_id = request.data['product_id']
        queryset = ProductPriceHistory.objects.values().filter(product_id=product_id).order_by('-created_at')[:7]
        serializer = ProductPriceHistorySerializer(queryset, many=True)

        response = {
            'status': 'success',
            'data': serializer.data
        }
        return JsonResponse(response, safe=False)
        