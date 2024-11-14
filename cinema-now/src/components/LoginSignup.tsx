import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField, clearErrors, login } from '../features/authSlice';
import userIcon from '../Assets/icons8-user-50.png';
import emailIcon from '../Assets/icons8-email-50.png';
import passwordIcon from '../Assets/icons8-password-50.png';
import { validateAuthInputs } from '../utils/validateAuth';
import { LOGIN, SIGNUP } from '../constanst/constants';
import { registerUser, loginUser } from '../services/AuthService';
import { RootState } from '../store/store';

interface LoginSignupProps {
  onClose: () => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onClose }) => {
  const [action, setAction] = useState<string>(SIGNUP);
  const [message, setMessage] = useState<string>('');
  const [errmessage, seterrMessage] = useState<string>('');
  const dispatch = useDispatch();
  const { username, email, password, confirmPassword, errors } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === SIGNUP) {
      const isValid = validateAuthInputs(
        dispatch,
        username,
        email,
        password,
        confirmPassword
      );

      if (isValid) {
        try {
          const res = await registerUser(username, email, password);
          console.log('res: ', res);
          setMessage('Registration successful! Please log in.');
          seterrMessage('');
          dispatch(clearErrors());
          // Clear input fields
          (
            ['username', 'email', 'password', 'confirmPassword'] as const
          ).forEach((field) => dispatch(setField({ field, value: '' })));

          // Switch to Login after successful registration
          setAction(LOGIN);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.username) {
            seterrMessage(error.username);
          } else seterrMessage(error.email);
        }
      }
    } else if (action === LOGIN) {
      dispatch(clearErrors());
      try {
        const data = await loginUser(email, password);
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        setMessage('Login successful!');
        dispatch(login());
        onClose();
      } catch {
        seterrMessage('Login failed. Please check your credentials.');
      }
    }
  };

  const handleChange = () => {
    setAction(action === SIGNUP ? LOGIN : SIGNUP);
    setMessage('');
    seterrMessage('');
    dispatch(clearErrors());
    (['username', 'email', 'password', 'confirmPassword'] as const).forEach(
      (field) => dispatch(setField({ field, value: '' }))
    );
  };

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='container bg-white p-8 rounded-lg shadow-md max-w-md w-full relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-600 text-xl font-bold'
        >
          &times;
        </button>

        <div className='header mb-6 text-center'>
          <h2 className='text-2xl font-semibold text-purple-900'>{action}</h2>
          <div className='underline h-1 bg-purple-900 mx-auto w-16 mt-2'></div>
          {message && <p className='text-green-600 mt-4'>{message}</p>}
          {errmessage && <p className='text-red-600 mt-4'>{errmessage}</p>}
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {action === SIGNUP && (
            <div className='flex items-center border border-gray-300 rounded-md p-2'>
              <img src={userIcon} alt='User Icon' className='w-5 h-5 mr-2' />
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) =>
                  dispatch(
                    setField({ field: 'username', value: e.target.value })
                  )
                }
                className='flex-1 outline-none'
              />
              {errors.username && (
                <span className='text-red-500 text-xs'>{errors.username}</span>
              )}
            </div>
          )}
          <div className='flex items-center border border-gray-300 rounded-md p-2'>
            <img src={emailIcon} alt='Email Icon' className='w-5 h-5 mr-2' />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) =>
                dispatch(setField({ field: 'email', value: e.target.value }))
              }
              className='flex-1 outline-none'
            />
            {errors.email && (
              <span className='text-red-500 text-xs'>{errors.email}</span>
            )}
          </div>
          <div className='flex items-center border border-gray-300 rounded-md p-2'>
            <img
              src={passwordIcon}
              alt='Password Icon'
              className='w-5 h-5 mr-2'
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) =>
                dispatch(setField({ field: 'password', value: e.target.value }))
              }
              className='flex-1 outline-none'
            />
            {errors.password && (
              <span className='text-red-500 text-xs'>{errors.password}</span>
            )}
          </div>
          {action === SIGNUP && (
            <div className='flex items-center border border-gray-300 rounded-md p-2'>
              <img
                src={passwordIcon}
                alt='Confirm Password Icon'
                className='w-5 h-5 mr-2'
              />
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) =>
                  dispatch(
                    setField({
                      field: 'confirmPassword',
                      value: e.target.value,
                    })
                  )
                }
                className='flex-1 outline-none'
              />
              {errors.confirmPassword && (
                <span className='text-red-500 text-xs'>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}
          {action === LOGIN && (
            <div className='forgot-password text-sm text-gray-600 mt-4'>
              Lost Password?{' '}
              <span className='text-blue-600 cursor-pointer'>Click here</span>
            </div>
          )}
          <div className='flex flex-col space-y-4 mt-6'>
            <button
              type='submit'
              className='text-white py-2 rounded-md bg-purple-600 hover:bg-blue-700 transition duration-200'
            >
              {action}
            </button>
            <button
              type='button'
              onClick={handleChange}
              className='text-gray-800 py-2 rounded-md bg-gray-200 hover:bg-gray-400 transition duration-200'
            >
              {action === SIGNUP ? LOGIN : SIGNUP}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
