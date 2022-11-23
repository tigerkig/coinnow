from django.urls import path

from . import views

urlpatterns = [
    path('productUserRelation', views.ProductUserRelationClass, name="ProductUserRelationClass"),
    path('productUserRelationListView/<int:pk>', views.ProductUserRelationListView.as_view()),
    path('productUserRelationDetail', views.ProductUserRelationDetailAPIView.as_view()),
    path('marketplaceListView', views.MarketplaceListView.as_view()),
    path('sellHistory', views.SellHistoryClass, name="SellHistoryClass"),
    path('buyHistory', views.BuyHistoryClass, name="BuyHistoryClass"),
    path('sellHistoryDetail', views.SellHistoryDetailAPIView.as_view()),
    path('buyHistoryDetail', views.BuyHistoryDetailAPIView.as_view()),
    path('productGetById', views.ProductGetById.as_view()),
    path('sellHistoryGetById', views.SellHistoryGetById.as_view()),
    path('buyHistoryGetById', views.BuyHistoryGetById.as_view()),
    path('buyProduct', views.BuyProduct.as_view()),
    path('getProductListById', views.GetProductListById.as_view()),
    path('getProductDetailInfo', views.GetProductDetailInfo.as_view()),

]