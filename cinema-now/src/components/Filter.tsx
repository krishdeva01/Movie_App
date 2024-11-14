import React, { useState } from 'react';
import filterIcon from '../Assets/filter_3876062.png';
import { genres } from '../constanst/constants';
import { getMovie } from '../services/MovieService';
import { setMovies } from '../features/movieSlice';
import { useDispatch } from 'react-redux';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [year, setSelectedyear] = useState<string>('');
  const years = [
    'All',
    ...Array.from({ length: 2024 - 2010 + 1 }, (_, i) => 2010 + i),
  ];
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedyear(event.target.value);
  };

  const handleSubmit = async () => {
    const resp = await getMovie('', selectedGenre, year);
    dispatch(setMovies(resp));
    setIsModalOpen(!isModalOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedGenre('');
    setSelectedyear('');
  };
  return (
    <>
      <div className='flex justify-end'>
        <div
          className='flex items-center cursor-pointer mr-60 sm:mr-[40px] sm:mt-[15px]'
          onClick={toggleModal}
        >
          <img src={filterIcon} className='h-5' alt='cinema-now' />
          <span className='h-5 ml-1'>Filter</span>
        </div>
      </div>

      <div>
        {isModalOpen && (
          <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden'>
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                {/* <!-- Modal header --> */}
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white text-center w-full '>
                    Filter
                  </h3>
                  <button
                    type='button'
                    onClick={toggleModal}
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    <svg
                      className='w-3 h-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 14'
                    >
                      <path
                        stroke='currentColor'
                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                      />
                    </svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                </div>
                <div className='p-4 md:p-5'>
                  <label
                    htmlFor='genre'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Genre
                  </label>
                  <select
                    id='genre'
                    className='block w-full p-2 mb-4 text-sm border rounded-lg bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    value={selectedGenre}
                    onChange={handleGenreChange}
                  >
                    {genres.map((genre) => (
                      <option key={genre}>{genre}</option>
                    ))}
                  </select>

                  <label
                    htmlFor='year'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Released Year
                  </label>
                  <select
                    id='year'
                    className='block w-full p-2 text-sm border rounded-lg bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    value={year}
                    onChange={handleYearChange}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <!-- Modal footer --> */}
                <div className='flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
                  <button
                    onClick={handleSubmit}
                    type='button'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Apply
                  </button>
                  <button
                    onClick={toggleModal}
                    type='button'
                    className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
