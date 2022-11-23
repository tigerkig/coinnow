from django.urls import path

from . import views

urlpatterns = [
    path('productUserRelation', views.ProductUserRelationClass, name="ProductUserRelationClass"),
    path('sellHistory', views.SellHistoryClass, name="SellHistoryClass"),
    path('buyHistory', views.BuyHistoryClass, name="BuyHistoryClass"),
    path('productUserRelationDetail', views.ProductUserRelationDetailAPIView.as_view()),
    path('sellHistoryDetail', views.SellHistoryDetailAPIView.as_view()),
    path('buyHistoryDetail', views.BuyHistoryDetailAPIView.as_view()),
    path('productGetById', views.ProductGetById.as_view()),
    path('sellHistoryGetById', views.SellHistoryGetById.as_view()),
    path('buyHistoryGetById', views.BuyHistoryGetById.as_view()),
]