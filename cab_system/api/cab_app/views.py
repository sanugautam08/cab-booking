from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Cab, CabBooking, RouteMap
from .serializers import CabSerializer, CabBookingSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import networkx as nx
from networkx.classes.function import path_weight
from datetime import datetime, timedelta


class CabViewSet(viewsets.ModelViewSet):
    queryset=Cab.objects.all()
    serializer_class=CabSerializer
    def get_available_cabs(request):
        #available_cabs=Cab.objects.filter(availability=True)
        return JsonResponse({'cabs':list(queryset)})
    

class CabBookingViewSet(viewsets.ModelViewSet):
    queryset = CabBooking.objects.all()
    serializer_class = CabBookingSerializer
    #@csrf_exempt  # Only use this if you want to disable CSRF protection for this view
    @require_POST
    def save_user_details(request):
    
        if request.method == 'POST':
            # Get data from the request
            email = request.POST.get('email')
            source = request.POST.get('source')
            destination = request.POST.get('destination')
           
            # Save the booking to the database
            print(email,source,destination)
            booking = CabBooking(user_email=email, source=source, destination=destination)
            booking.save()
            
            
            # Return a JSON response
            response_data = {'message': 'Cab booked successfully'}
            
            return JsonResponse(response_data)

        # Handle other HTTP methods if needed
        return JsonResponse({'error': 'Invalid HTTP method'})

def calculate_time(request,param1,param2):
   
    queryset = RouteMap.objects.all()
    G = nx.Graph()
    for query in queryset:
         G.add_edge(query.city1,query.city2,weight=query.time)
    path = nx.dijkstra_path(G, param1, param2)
    total_time = path_weight(G,path,weight="weight")
    #print(total_time)
    return JsonResponse({'time':total_time})

def set_cab_unavailable(request, cab_id, minutes):
    cab = Cab.objects.get(id=cab_id)

    # Calculate the timestamp for when the cab should become available again
    now = datetime.now()
    available_until = now + timedelta(minutes=int(minutes))

    # Update the cab's availability and available_until fields
    cab.availability = False
    cab.available_until = available_until
    cab.save()

    return JsonResponse({'message': 'Cab availability set to False for {} minutes'.format(minutes)})


