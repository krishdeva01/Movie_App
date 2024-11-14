import axios from 'axios';
import api from './api';

export const getMovie = async (
  searchTerm = '',
  genre = '',
  year = '',
  page = 1
) => {
  try {
    const params = {
      limit: 10,
      ...(searchTerm && { search: searchTerm }),
      ...(genre && { genre }),
      ...(year && { year }),
      ...(searchTerm || genre || year ? {} : { offset: (page - 1) * 10 }),
    };

    const response = await axios.get(
      `${process.env.REACT_APP_INTERNAL_ENDPOINT}movies/`,
      { params }
    );
    console.log('Get movie  called', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return [];
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_INTERNAL_ENDPOINT}movies/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return [];
  }
};

export const fetchMovies = async (searchTerm = '', page = 1) => {
  try {
    const resp = await getMovie(searchTerm, '', '', page);
    return resp;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return [];
  }
};

export const fetchBookings = async () => {
  try {
    const response = await api.get('user/bookings/');
    return response.data;
  } catch (error) {
    console.error('Error fetching booking history', error);
    return [];
  }
};
