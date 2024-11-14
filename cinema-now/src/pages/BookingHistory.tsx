import React, { useEffect, useState } from 'react';
import { useAuth } from '../customhooks/useAuth';
import { fetchBookings } from '../services/MovieService';

interface Booking {
  id: number;
  total_amount: string;
  booking_date: string;
  user: number;
  movie_name: string;
  showtime: number;
  seats: number[];
}

const BookingHistory = () => {
  useAuth();
  const [bookings, setbookings] = useState<Booking[]>([]);
  useEffect(() => {
    const getbookdata = async () => {
      const resp = await fetchBookings();
      console.log(resp);

      setbookings(resp);
    };
    getbookdata();
  }, []);
  return (
    <div className='max-w-4xl mx-auto p-5 mt-20'>
      <h1 className='text-2xl font-bold mb-4'>Booking History</h1>
      {bookings.length > 0 ? (
        <table className='min-w-full border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>ID</th>
              <th className='border border-gray-300 px-4 py-2'>Movie</th>
              {/* <th className='border border-gray-300 px-4 py-2'>Showtime</th> */}
              <th className='border border-gray-300 px-4 py-2'>Seats</th>
              <th className='border border-gray-300 px-4 py-2'>Total Amount</th>
              <th className='border border-gray-300 px-4 py-2'>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className='hover:bg-gray-50'>
                <td className='border border-gray-300 px-4 py-2'>
                  {booking.id}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {booking.movie_name}
                </td>
                {/* <td className='border border-gray-300 px-4 py-2'>
                  {booking.showtime}
                </td> */}
                <td className='border border-gray-300 px-4 py-2'>
                  {booking.seats.join(', ')}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {booking.total_amount}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {new Date(booking.booking_date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='mt-4'>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingHistory;
