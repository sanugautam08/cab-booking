from django.db import models
import datetime
# Create your models here.



class Cab(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    availability = models.BooleanField(default=True)
    available_until = models.DateTimeField(null=True, blank=True)

class CabBooking(models.Model):
    user_email = models.EmailField()
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    #cab = models.ForeignKey(Cab, on_delete=models.PROTECT , null=True, blank=True)
    #booking_start_time = models.DateTimeField(default=datetime.datetime.now())
   

class RouteMap(models.Model):
    city1 = models.CharField(max_length=50)
    city2 = models.CharField(max_length=50)
    time = models.IntegerField(default=100000)