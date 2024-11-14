import React, { useEffect } from 'react';
import { fetchMovies } from '../services/MovieService';
import MovieCard from '../components/MovieCard';
import { setMovies } from '../features/movieSlice';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../customhooks/useAuth';

const UpcomingShows = () => {
  useAuth();
  const { movieList } = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies('2025');
      dispatch(setMovies(movies));
    };
    getMovies();
  }, []);

  return (
    <div className='container mx-auto p-4 mt-20 sm:mt-28'>
      <h1 className='text-2xl font-bold mb-4'>Upcoming Shows</h1>{' '}
      <p className='mb-4'>Here are all the upcoming shows...</p>{' '}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {movieList?.results &&
          (movieList.results.length > 0 ? (
            movieList.results.map((movie) => (
              <MovieCard
                key={movie.id}
                imdbID={movie.id}
                Poster={movie.poster}
                Title={movie.name}
                Year={movie.year}
                genre={movie.genre}
              />
            ))
          ) : (
            <p className='text-center text-gray-500 mt-4'>
              No movies available
            </p>
          ))}
      </div>
    </div>
  );
};

export default UpcomingShows;
