from django.urls import path
from . import views

# start with blog
urlpatterns = [
    # http://localhost:8000/business/1
    path('', views.business_menu, name='business_menu'),
]