import React, { useState } from 'react';
import BookingCard from './BookingCard';

const UserBookings = () => {
   
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">My Bookings</h2>
      <BookingCard/>
    </div>
  );
};

export default UserBookings;
