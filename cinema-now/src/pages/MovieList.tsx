import React, { useEffect } from 'react';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../components/MovieCard';
import Search from '../components/Search';
import { useAuth } from '../customhooks/useAuth';
import Filter from '../components/Filter';
import { setCurrentPage, setMovies } from '../features/movieSlice';
import { fetchMovies } from '../services/MovieService';

const MovieList = () => {
  useAuth();
  const dispatch = useDispatch();
  const { movieList, currentPage } = useSelector(
    (state: RootState) => state.movie
  );

  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies('', currentPage);

      dispatch(setMovies(movies));
    };
    getMovies();
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const totalPages = movieList?.count ? Math.ceil(movieList.count / 10) : 0;
  console.log('movieList: ', movieList);

  return (
    <>
      {' '}
      <Search />
      <Filter />
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {movieList?.results && movieList.results.length > 0 ? (
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
            <p className='text-center text-gray-500 mt-4'>No movie available</p>
          )}
        </div>
        <div className='flex items-center justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600 disabled:bg-gray-400`}
          >
            Previous
          </button>
          <span className='mx-4'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 disabled:bg-gray-400`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieList;
