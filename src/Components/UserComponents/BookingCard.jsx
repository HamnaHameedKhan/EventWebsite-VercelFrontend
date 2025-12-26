import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/axios'; // Adjust the import path to your axios instance
import { fetchUserBookingsRequest, fetchUserBookingsSuccess, fetchUserBookingsFailure } from '../../redux/bookingSlice';

const BookingCard = () => {
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.bookings.userBookings);
  console.log(userBookings)
  const loading = useSelector((state) => state.bookings.loading);
  const error = useSelector((state) => state.bookings.error);
  const userId = useSelector((state) => state.auth.user.id)
  console.log('userId',userId)

  useEffect(() => {
    const fetchBookings = async () => {
      dispatch(fetchUserBookingsRequest());

      try {
        const response = await axios.get(`/userbooking/${userId}`); // Adjust the endpoint
        dispatch(fetchUserBookingsSuccess(response.data));
      } catch (err) {
        dispatch(fetchUserBookingsFailure(err.message || 'Failed to fetch user bookings'));
      }
    };

    fetchBookings();
  }, [dispatch, userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userBookings.map((booking) => (
            <div key={booking.id} className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{booking.id}</h3>
              <div className="text-gray-600 mb-4">
                <p><strong>Event Title:</strong> {booking.eventId.title}</p>
                <p><strong>Event Date:</strong> {formatDate(booking.eventId.date)}</p>
                <p><strong>Event Time:</strong> {formatTime(booking.eventId.time)}</p>
                <p><strong>Event Location:</strong> {booking.eventId.location}</p>
              </div>
            </div>
          ))}
        </div>
      
      )
      }
    </div>
  );
};

export default BookingCard;
