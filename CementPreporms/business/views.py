from django.shortcuts import render_to_response, get_object_or_404
from .models import Blog, BlogType

def business_home(request):
    context = {}
    context['blogs'] = Blog.objects.all()
    return render_to_response('index.html', context)

def business_menu(request):
    context = {}
    context['blogs'] = Blog.objects.all()
    return render_to_response('37.html', context)

def business_news(request):
	context = {}
	context['blogs'] = Blog.objects.all()
	return render_to_response('1.html', context)