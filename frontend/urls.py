from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('categories', views.index),
    path('products', views.index),
    path('users', views.index),
    path('', views.index),
 ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

