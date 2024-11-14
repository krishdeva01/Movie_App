from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Movie, Showtime, Seat, Booking, MovieFilter
from .serializers import MovieSerializer, ShowtimeSerializer, SeatSerializer, BookingSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.pagination import LimitOffsetPagination
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend

class MovieViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = MovieFilter

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
    
    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)

        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) | 
                Q(genre__icontains=search_term)| 
                Q(year__icontains=search_term) 
            )
        else:
            queryset = queryset.exclude(year='2025') 
        return queryset


class ShowtimeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Showtime.objects.all()
    serializer_class = ShowtimeSerializer

    def get_queryset(self):
        queryset = Showtime.objects.all()
        movie_id = self.request.query_params.get('movie_id')
        if movie_id:
            queryset = queryset.filter(movie__id=movie_id)
        return queryset

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
    
class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_booked:
            return Response({"detail": "Seat already booked."}, status=status.HTTP_400_BAD_REQUEST)
        instance.is_booked = True
        instance.save()
        return super().update(request, *args, **kwargs)


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        seats = data.get('seats', [])
        total_amount = 0
        
        for seat_id in seats:
            try:
                seat = Seat.objects.get(id=seat_id)
                if seat.is_booked:
                    return Response({"detail": f"Seat {seat_id} is already booked."}, status=status.HTTP_400_BAD_REQUEST)
                total_amount += seat.price
            except Seat.DoesNotExist:
                return Response({"detail": f"Seat {seat_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        booking = Booking.objects.create(
            user=request.user,
            movie_id=data['movie'],
            showtime_id=data['showtime'],
            total_amount=total_amount
        )
        booking.seats.set(seats)
        booking.save()
        return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)


class UserBookingViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BookingSerializer

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

