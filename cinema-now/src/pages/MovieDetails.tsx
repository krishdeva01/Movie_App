import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { useAuth } from '../customhooks/useAuth';

const MovieDetails = () => {
  useAuth();
  const { movieList } = useSelector((state: RootState) => state.movie);
  const { movieId } = useParams<{ movieId: string | undefined }>();
  interface Movie {
    id: number;
    name: string;
    genre: string;
    duration: string;
    description: string;
    poster: string;
  }
  if (!movieId) {
    return (
      <div>Sorry, your requested movie is not Available at the moment</div>
    );
  }

  const movie = movieList?.results.find(
    (result: Movie) => result.id === parseInt(movieId)
  );
  const imageName = movie?.poster.split('/').pop();
  const mediaURL = `${process.env.REACT_APP_MEDIA_URL}posters/${imageName}`;
  return (
    <>
      {movie ? (
        <div className='bg-gray-100 dark:bg-gray-800 py-8 pt-16 mt-10'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col md:flex-row -mx-4'>
              <div className='md:w-1/2 lg:w-1/3 px-4 mb-6 md:mb-0'>
                <div className='aspect-w-2 aspect-h-3 rounded-lg bg-gray-300 dark:bg-gray-700 overflow-hidden shadow-md'>
                  <img
                    className='w-full h-full object-cover'
                    src={mediaURL}
                    alt={movie.name}
                  />
                </div>

                <div className='flex mt-4 space-x-4'>
                  <Link
                    to={`/booking/${movieId}`}
                    className='w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700'
                  >
                    Book Tickets
                  </Link>
                  <button className='w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600'>
                    Watch Trailer
                  </button>
                </div>
              </div>

              <div className='md:w-1/2 lg:w-2/3 px-4'>
                <div className='mt-20'>
                  <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 text-ellipsis overflow-hidden'>
                    {movie.name}
                  </h2>

                  <div className='text-gray-600 dark:text-gray-300 text-sm mb-4'>
                    <p>
                      <strong>Genre:</strong> {movie.genre}
                    </p>
                    <p>
                      <strong>Duration:</strong> {movie.duration}
                    </p>
                  </div>

                  <div>
                    <span className='font-bold text-gray-700 dark:text-gray-300'>
                      Movie Description:
                    </span>
                    <p className='text-gray-600 dark:text-gray-300 text-sm mt-2'>
                      {movie.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-20'>
          Sorry, your requested movie is not Available at the moment
        </div>
      )}
    </>
  );
};

export default MovieDetails;
