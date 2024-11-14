from rest_framework import serializers
from .models import Movie, Showtime, Seat, Booking

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class ShowtimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Showtime
        fields = '__all__'


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    movie_name = serializers.CharField(source='movie.name', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'total_amount', 'booking_date', 'user', 'movie_name', 'showtime', 'seats']