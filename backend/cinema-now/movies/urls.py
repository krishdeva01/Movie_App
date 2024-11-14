from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, ShowtimeViewSet, SeatViewSet, BookingViewSet, UserBookingViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movies')
router.register(r'showtimes', ShowtimeViewSet, basename='showtimes')
router.register(r'seats', SeatViewSet, basename='seats')
router.register(r'bookings', BookingViewSet, basename='bookings')
router.register(r'user/bookings', UserBookingViewSet, basename='history')

urlpatterns = [
    path('', include(router.urls)),
]
