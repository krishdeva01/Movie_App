import React, { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../services/MovieService';
import { setMovies, setCurrentPage } from '../features/movieSlice';
import { isUserLoggedIn } from '../utils/helper';
import { ACCESS_TOKEN_KEY } from '../constanst/constants';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/authSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const usr_loggedIn = isUserLoggedIn(ACCESS_TOKEN_KEY);
    if (usr_loggedIn) {
      dispatch(login());
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }, [dispatch, navigate]);

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

  return (
    <>
      <div className='container mx-auto p-4 mt-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {movieList?.results?.map((movie) => (
            <MovieCard
              key={movie.id}
              imdbID={movie.id}
              Poster={movie.poster}
              Title={movie.name}
              Year={movie.year}
              genre={movie.genre}
            />
          ))}
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

export default Home;
