from django.db import models
from django.contrib.auth.models import User
from django_filters.rest_framework import FilterSet, CharFilter
from django.db.models import Q

class Movie(models.Model):
    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    year = models.CharField(max_length=4, default='2017')
    duration = models.DurationField()
    description = models.TextField()
    poster = models.ImageField(upload_to='posters/')

    def __str__(self):
        return self.name

class MovieFilter(FilterSet):
    genre = CharFilter(method='filter_by_genre')

    class Meta:
        model = Movie
        fields = ['genre', 'year']

    def filter_by_genre(self, queryset, name, value):
        genres = value.split(",")
        query = Q()
        for genre in genres:
            query |= Q(genre__icontains=genre.strip())
        return queryset.filter(query)
    
class Showtime(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    showtime = models.DateTimeField()

    def __str__(self):
        return f"{self.movie.name} - {self.showtime}"


class Seat(models.Model):
    SEAT_TYPES = (
        ('regular', 'Regular'),
        ('premium', 'Premium'),
        ('vip', 'VIP'),
    )
    
    showtime = models.ForeignKey(Showtime, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=10)
    is_booked = models.BooleanField(default=False)
    seat_type = models.CharField(max_length=10, choices=SEAT_TYPES, default='regular')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Seat {self.seat_number} for {self.showtime.movie.name}, Type: {self.get_seat_type_display()}, Price: {self.price}"

    def save(self, *args, **kwargs):
        if self.seat_type == 'premium':
            self.price = 200.00 
        elif self.seat_type == 'vip':
            self.price = 400.00 
        else:
            self.price = 100.00
        super().save(*args, **kwargs)


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    seats = models.ManyToManyField(Seat)
    showtime = models.ForeignKey(Showtime, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking by {self.user.username} for {self.movie.name}"
