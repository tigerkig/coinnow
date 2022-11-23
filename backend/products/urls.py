from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProductList.as_view()),
    path('<int:pk>', views.ProductDetail.as_view()),
    path('getProductDetailById', views.GetProductDetailById.as_view()),
    path('updateCurrentPriceById', views.UpdateCurrentPriceById.as_view()),
]
