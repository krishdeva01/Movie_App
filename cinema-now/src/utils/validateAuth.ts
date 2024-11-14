// utils/validateAuth.ts
import { Dispatch } from 'redux';
import { setError } from '../features/authSlice';

export const validateAuthInputs = (
  dispatch: Dispatch,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): boolean => {
  dispatch(setError({ field: 'username', value: '' }));
  dispatch(setError({ field: 'email', value: '' }));
  dispatch(setError({ field: 'password', value: '' }));
  dispatch(setError({ field: 'confirmPassword', value: '' }));

  let isValid = true;

  if (!username) {
    dispatch(setError({ field: 'username', value: 'Username is required.' }));
    isValid = false;
  } else if (username.length < 3) {
    dispatch(
      setError({
        field: 'username',
        value: 'Username must be at least 3 characters long.',
      })
    );
    isValid = false;
  }

  if (!email) {
    dispatch(setError({ field: 'email', value: 'Email is required.' }));
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    dispatch(setError({ field: 'email', value: 'Invalid email format.' }));
    isValid = false;
  }

  if (!password) {
    dispatch(setError({ field: 'password', value: 'Password is required.' }));
    isValid = false;
  } else if (password.length < 8) {
    dispatch(
      setError({
        field: 'password',
        value: 'Password must be at least 8 characters long.',
      })
    );
    isValid = false;
  } else if (!/[A-Z]/.test(password)) {
    dispatch(
      setError({
        field: 'password',
        value: 'Password must contain at least one uppercase letter.',
      })
    );
    isValid = false;
  } else if (!/[0-9]/.test(password)) {
    dispatch(
      setError({
        field: 'password',
        value: 'Password must contain at least one number.',
      })
    );
    isValid = false;
  } else if (!/[!@#$%^&*]/.test(password)) {
    dispatch(
      setError({
        field: 'password',
        value: 'Password must contain at least one special character.',
      })
    );
    isValid = false;
  }

  if (password !== confirmPassword) {
    dispatch(
      setError({ field: 'confirmPassword', value: 'Passwords do not match.' })
    );
    isValid = false;
  }

  return isValid;
};
