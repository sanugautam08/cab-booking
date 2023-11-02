from django.urls import path,include
from . import views

urlpatterns = [
    
    #path('',views.home),
    path('',include('api.cab_app.urls')),
]