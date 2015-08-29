from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
# Create your views here.
class Index(View):
	def get(self, request):
		params = {}
		params["name"] = "Jo"
		return render(request, 'home.html', params)
	def post(self, request):
		params = {}
		params["name"] = "Jo"
		return render(request, 'home.html', params)
		