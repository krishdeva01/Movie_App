import React from 'react';
import { useAuth } from '../customhooks/useAuth';
const BookingConfirm = () => {
  useAuth();
  return (
    <div className='flex justify-center mt-20'>BookingConfirm coming soon</div>
  );
};

export default BookingConfirm;
