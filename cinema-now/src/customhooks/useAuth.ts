import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/authSlice';
import { isUserLoggedIn } from '../utils/helper';
import { ACCESS_TOKEN_KEY } from '../constanst/constants';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const usr_loggedIn = isUserLoggedIn(ACCESS_TOKEN_KEY);
    if (usr_loggedIn) {
      dispatch(login());
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      dispatch(logout());
      navigate('/');
      alert('Please login to continue');
    }
  }, [dispatch, navigate]);
};
