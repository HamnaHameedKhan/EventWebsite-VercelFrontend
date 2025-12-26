import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEvent,
  createEventRequest,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
  setEditForm,
} from '../../redux/eventSlice';

const EventManagement = ({setActiveComponent}) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  const fetchAllEvents = async () => {
    dispatch(createEventRequest());

    try {
      const res = await axios.get('/allEvents');
      console.log(res.data);
      dispatch(getEvent(res.data));
    } catch (error) {
      console.log('Error fetching events:', error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, [dispatch]);

  const handleDeleteEvent = async (id) => {
    dispatch(deleteEventStart());
    try {
      const res = await axios.delete(`/delete/${id}`);
      dispatch(deleteEventSuccess(id));
      console.log(res.data);
      toast.success('Event Deleted');
      fetchAllEvents();
    } catch (error) {
      console.log('error', error.response?.data?.msg);
      dispatch(deleteEventFailure(error.response?.data?.msg));
      toast.error('Error deleting event');
    }
  };

  const handleEditEvent = (event) => {
    setActiveComponent('EventForm')
    dispatch(setEditForm(event));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (time) => {
    if (!time || typeof time !== 'string') {
      return ''; // or a default value
    }
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Event Management</h2>
      <ToastContainer />
      {/* upcoming events */}
      <h3 className="text-2xl font-semibold mb-4">Upcoming Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(events) &&
          events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded shadow">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold truncate">{event.title}</h4>
                <div className="flex space-x-2">
                  <i
                    onClick={() => {
                      handleEditEvent(event);
                    }}
                    className="fas fa-edit cursor-pointer text-secondary"
                  ></i>
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(event._id);
                    }}
                    className="fas fa-trash cursor-pointer text-red-500"
                  ></i>
                </div>
              </div>
              <p className="text-gray-600 truncate">{event.location}</p>
              <p className="text-gray-600">
                {formatDate(event.date)} at {formatTime(event.time)}
              </p>
              <p className="text-gray-600 mb-4 truncate">{event.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventManagement;
