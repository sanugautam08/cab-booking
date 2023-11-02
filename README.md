# Cab Booking System

This is a simple cab booking system with features like calculating the shortest time to reach from one destination to another and estimating the cost. The project is built using Django and Django REST Framework in the backend and React in the frontend.

## Base URLs

In the Django backend, the base URLs are defined as follows:

python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
]


The api/ endpoint is where most of the cab booking functionality is implemented.

## API Endpoints

### Calculate Time and Estimated Cost

To calculate the shortest time to reach from one destination to another and estimate the cost, you can use the following API endpoints:

- path('calculate_time/<str:param1>/<str:param2>/', calculate_time, name='calculate_time'): This endpoint calculates the shortest time to reach from param1 to param2.

- path('set-unavailable/<int:cab_id>/<int:minutes>/', set_cab_unavailable, name='update-cab-availability'): This endpoint is used to make a booking with the specified cab id.


### React Frontend

The React frontend is responsible for providing a user-friendly interface for interacting with the cab booking system. It communicates with the Django backend through the API endpoints mentioned above.

## Getting Started

1. Clone this repository.

2. Set up the Django backend by running the following commands:

   bash
   python manage.py migrate
   python manage.py runserver
   

3. Set up the React frontend by navigating to the frontend directory and running the following commands:

   bash
   npm install
   npm start
   

4. Access the application in your web browser at http://localhost:3000.

## Features

- Calculate the shortest time to reach from one destination to another.
- Estimate the cost of a cab ride.
- Make cab bookings.
- User-friendly interface with React frontend.

## Technologies Used

- Django (Backend)
- React (Frontend)

Feel free to explore and customize this cab booking system according to your requirements!
