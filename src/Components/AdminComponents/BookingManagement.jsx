import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import {
  fetchAllBookingsFailure,
  fetchAllBookingsRequest,
  fetchAllBookingsSuccess,
} from "../../redux/bookingSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    dispatch(fetchAllBookingsRequest());
    try {
      const response = await axios.get("/allBookings");
      dispatch(fetchAllBookingsSuccess(response.data));
      setBookings(response.data);
    } catch (error) {
      dispatch(fetchAllBookingsFailure());
      console.error(error);
    }
  };

  const handleModifyBooking = (id) => {
    console.log("Modify booking", id);
  };

  const handleCancelBooking = async (id) => {
    try {
      await axios.delete(`/booking/${id}`);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[90%] h-full p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Booking Management</h2>

      <div className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-4">All Bookings</h3>

        {/* Scrollable Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 hidden md:table-cell">Phone</th>
                <th className="px-4 py-3">Tickets</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 hidden lg:table-cell">Time</th>
                <th className="px-4 py-3 hidden xl:table-cell">Location</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings?.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="border-t text-sm hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{booking.fullname}</td>
                    <td className="px-4 py-3">{booking.email}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {booking.phone}
                    </td>
                    <td className="px-4 py-3">{booking.tickets}</td>
                    <td className="px-4 py-3">{booking.eventId?.title || "—"}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {booking.eventId?.date || "—"}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {booking.eventId?.time || "—"}
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      {booking.eventId?.location || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleModifyBooking(booking._id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Modify"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Cancel"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center py-6 text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
