import axios from 'axios';
import api from './api';

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_INTERNAL_ENDPOINT}auth/register/`,
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_INTERNAL_ENDPOINT}auth/login/`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem('refresh');
  try {
    await api.post('auth/logout/', { refresh: refreshToken });
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  } catch (error) {
    throw error.response?.data;
  }
};
