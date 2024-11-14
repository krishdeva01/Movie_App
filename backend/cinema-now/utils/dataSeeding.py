import os
import requests
from datetime import timedelta
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.conf import settings
from movies.models import Movie, Showtime,Seat,Booking
from datetime import datetime, timedelta
import random
from .get_env_value import get_env

MOVIE_ENDPOINT= get_env("MOVIE_ENDPOINT")

SEARCH_QUERY = "justice"

def fetch_movies():
    response = requests.get(f"{MOVIE_ENDPOINT}&s={SEARCH_QUERY}")
    data = response.json()

    if data.get("Response") == "True":
        for movie_data in data.get("Search", []):
            movie_id = movie_data.get("imdbID")
            details_response = requests.get(f"{MOVIE_ENDPOINT}&i={movie_id}")
            details = details_response.json()

            if details.get("Response") == "True":
                name = details.get("Title")
                genre = details.get("Genre", "Unknown")
                description = details.get("Plot", "")
                poster_url = details.get("Poster", "")

                duration = timedelta(hours=2)

                movie = Movie(name=name, genre=genre, duration=duration, description=description)

                if poster_url != "N/A" and poster_url:
                    temp_image = NamedTemporaryFile(delete=True)
                    image_response = requests.get(poster_url)
                    temp_image.write(image_response.content)
                    temp_image.flush()

                    movie.poster.save(f"{movie_id}.jpg", File(temp_image), save=True)
                else:
                    movie.poster = None

                movie.save()
                print(f"Saved movie: {name}")
            else:
                print(f"Failed to fetch details for {movie_id}")
    else:
        print("No movies found.")


        
def create_showtimes():
    movies = Movie.objects.all()
    showtime_count_per_movie = 5  
    start_time = datetime.now()

    for movie in movies:
        for _ in range(showtime_count_per_movie):
            random_days = random.randint(0, 30)
            random_hours = random.randint(0, 23)
            random_minutes = random.randint(0, 59)

            showtime = start_time + timedelta(days=random_days, hours=random_hours, minutes=random_minutes)

            Showtime.objects.create(movie=movie, showtime=showtime)
            print(f"Showtime created for {movie.name} at {showtime}")

    print("Showtimes creation completed.")


    
def create_seats_for_showtimes():
    showtimes = Showtime.objects.all()
    seat_types = [seat_type[0] for seat_type in Seat.SEAT_TYPES] 
    for showtime in showtimes:
        for i in range(1, 11): 
            seat_number = f"{showtime.movie.name[:3].upper()}{i:02d}" 
            seat_type = random.choice(seat_types)
            print("seat_type: ", seat_type)
            Seat.objects.create(
                showtime=showtime,
                seat_number=seat_number,
                seat_type=seat_type,
                is_booked=False
            )
            print(f"Created {seat_type} seat {seat_number} for showtime of {showtime.movie.name}.")

    print("Seats creation completed.")

if __name__ == "__main__":
    # fetch_movies()
    # create_showtimes()
    # create_seats_for_showtimes()
    pass