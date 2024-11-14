import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import { logoutUser } from '../services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  toggleModal,
  closeModal,
  setField,
} from '../features/authSlice';
import { RootState } from '../store/store';
import logo from '../Assets/cinemaLogo.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isModalOpen } = useSelector(
    (state: RootState) => state.auth
  );

  const handleModalToggle = () => {
    dispatch(toggleModal());
  };

  const closeAuthModal = () => {
    dispatch(closeModal());
    (['username', 'email', 'password', 'confirmPassword'] as const).forEach(
      (field) => dispatch(setField({ field, value: '' }))
    );
    // dispatch(login());
  };

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate('/');
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav className='bg-red-500 fixed w-full z-20 top-0 start-0 border-b border-gray-600'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link to='/' className='flex items-center space-x-3'>
          <img src={logo} className='h-8' alt='cinema-now' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap text-white'>
            Cinema-n&#127871;w
          </span>
        </Link>
        <div className='flex md:order-2 space-x-3'>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 md:px-4 md:py-2 text-center'
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleModalToggle}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center'
            >
              Login / Signup
            </button>
          )}
          <button
            data-collapse-toggle='navbar-sticky'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            aria-controls='navbar-sticky'
            aria-expanded='false'
            onClick={toggleMenu}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path stroke='currentColor' d='M1 1h15M1 7h15M1 13h15' />
            </svg>
          </button>
        </div>
        <div
          className={`${isOpen ? 'block' : 'hidden'} md:flex md:w-auto md:order-1`}
          id='navbar-sticky'
        >
          <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-blue-900 md:space-x-8 md:flex-row md:mt-0 md:border-0'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-100'}`
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/movies'
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-100'}`
                }
                onClick={toggleMenu}
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/upcoming-shows'
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-100'}`
                }
                onClick={toggleMenu}
              >
                Upcoming Shows
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/booking-history'
                className={({ isActive }) =>
                  `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-100'}`
                }
                onClick={toggleMenu}
              >
                Booking History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {isModalOpen && <LoginSignup onClose={closeAuthModal} />}
    </nav>
  );
};

export default Navbar;
