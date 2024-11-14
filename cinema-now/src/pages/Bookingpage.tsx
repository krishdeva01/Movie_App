import React from 'react';
import { useAuth } from '../customhooks/useAuth';
const Bookingpage = () => {
  useAuth();
  return (
    <div className='flex justify-center mt-20'>Bookingpage coming soon</div>
  );
};

export default Bookingpage;
