from django.urls import path
from . import views

# start with blog
urlpatterns = [
    # http://localhost:8000/business/1
    path('', views.business_menu, name='business_menu'),
    path('news/', views.business_news, name='business_news'),
    path('product/', views.business_products, name='business_products'),
]