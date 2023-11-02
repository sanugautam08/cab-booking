from django.contrib import admin
from .models import Cab, CabBooking, RouteMap
# Register your models here.

@admin.register(Cab)
class CabAdmin(admin.ModelAdmin):
    list_display=['name','availability','available_until']

@admin.register(CabBooking)
class CabBookingAdmin(admin.ModelAdmin):
    list_display=['user_email','source','destination']

@admin.register(RouteMap)
class RouteAdmin(admin.ModelAdmin):
    list_display=['city1','city2','time']