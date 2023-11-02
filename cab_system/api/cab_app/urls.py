from django.urls import path

from rest_framework.routers import DefaultRouter
from .views import CabViewSet, CabBookingViewSet,calculate_time,set_cab_unavailable

router = DefaultRouter()
router.register(r'cabs', CabViewSet)
router.register(r'cabbooking', CabBookingViewSet)

urlpatterns = router.urls+[
    path('calculate_time/<str:param1>/<str:param2>/',calculate_time,name='calculate_time'),
    path('set-unavailable/<int:cab_id>/<int:minutes>/', set_cab_unavailable, name='update-cab-availability'),
]

# urls.py



