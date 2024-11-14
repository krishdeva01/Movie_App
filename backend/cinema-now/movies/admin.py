from django.contrib import admin
from .models import Movie, Showtime, Seat, Booking

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('name', 'genre', 'duration', 'year')

@admin.register(Showtime)
class ShowTimeAdmin(admin.ModelAdmin):
    list_display = ('movie', 'showtime')

@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('showtime', 'seat_number', 'is_booked')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'movie', 'showtime', 'total_amount')
