import React, { useState, useEffect } from 'react';
import axios from '../../axios/axios'
import { useDispatch } from 'react-redux';
import { fetchAllBookingsFailure, fetchAllBookingsRequest, fetchAllBookingsSuccess } from '../../redux/bookingSlice';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch=useDispatch()

  useEffect(() => {
    // Fetch bookings from the backend
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    dispatch(fetchAllBookingsRequest())

    try {
      const response = await axios.get('/allBookings');
      dispatch(fetchAllBookingsSuccess(response.data))
      setBookings(response.data);
      console.log(response.data)
      console.log("Event" , response.data.fullname)
      
    } catch (error) {
      dispatch(fetchAllBookingsFailure())
      // console.log('error',error.msg)
    }
   
    
  };

  const handleModifyBooking = (bookingId) => {
    // Implement modify booking functionality
    console.log('Modify booking', bookingId);
  };

  const handleCancelBooking = async (bookingId) => {
    // Implement cancel booking API call
    await fetch(`/api/bookings/${bookingId}`, {
      method: 'DELETE',
    });
    fetchBookings();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Booking Management</h2>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">All Bookings</h3>
        <div className="overflow-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Tickets</th>
                <th className="px-4 py-2">Event Title</th>
                <th className="px-4 py-2">Event Date</th>
                <th className="px-4 py-2">Event Time</th>
                <th className="px-4 py-2">Event Location</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) && bookings.map((booking,index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{index+1}</td>
                  <td className="px-4 py-2">{booking.fullname}</td>
                  <td className="px-4 py-2">{booking.email}</td>
                  <td className="px-4 py-2">{booking.phone}</td>
                  <td className="px-4 py-2">{booking.tickets}</td>
                  {/* <td className="px-4 py-2">{booking.eventId.title}</td>
                  <td className="px-4 py-2">{booking.eventId.date}</td>
                  <td className="px-4 py-2">{booking.eventId.time}</td>
                  <td className="px-4 py-2">{booking.eventId.location}</td> */}
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleModifyBooking(booking.id)}
                      className="bg-secondary text-white px-4 py-2 rounded"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
