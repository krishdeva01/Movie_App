import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMovie } from '../services/MovieService';
import { setMovies } from '../features/movieSlice';
import debounce from '../customhooks/useDebounce';

const Search = () => {
  const [name, setname] = useState<string>('');
  const [err] = useState('');
  const dispatch = useDispatch();

  const debouncedFetchMovie = useCallback(
    debounce(async (searchTerm: string) => {
      const resp = await getMovie(searchTerm);
      dispatch(setMovies(resp));
    }, 500),
    []
  );

  useEffect(() => {
    if (name) {
      debouncedFetchMovie(name);
    }
  }, [name, debouncedFetchMovie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };

  return (
    <div style={{ marginTop: '135px' }}>
      <form className='max-w-md mx-auto mt-20'>
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div className='relative'>
          <input
            type='search'
            id='default-search'
            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search Movies'
            onChange={handleChange}
          />
          <button
            type='submit'
            className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
        {err && <p style={{ fontSize: '16px', color: 'red' }}>{err}</p>}
      </form>
    </div>
  );
};

export default Search;
