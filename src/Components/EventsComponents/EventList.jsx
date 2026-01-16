import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/axios';
import {
  getEvent,
  createEventRequest,
  selectEvent,
} from '../../redux/eventSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EventList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const events = useSelector((state) => state.event.events);
  const loading = useSelector((state) => state.event.loading);
  const error = useSelector((state) => state.event.error);

  useEffect(() => {
    const fetchAllEvents = async () => {
      dispatch(createEventRequest());
      try {
        const res = await axios.get('/upcoming-events');
        // dispatch(getEvent(res.data));
        dispatch(getEvent(res.data || []));

      } catch (err) {
        console.log('Error fetching events:', err);
        dispatch(getEvent([]));

      }
    };

    fetchAllEvents();
  }, [dispatch]);

  const handleLearnMore = (event) => {
    dispatch(selectEvent(event));
    navigate(`/eventDetails/${event._id}`);
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
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className="bg-tertiary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 text-secondary">
          Upcoming Events
        </h2>
        <p className="text-1xl text-center mb-6 text-gray-100">
          Explore what’s coming next and don’t miss out on amazing experiences.
        </p>

        {/* Loader */}
        {loading && (
          <p className="text-center text-gray-600">Loading events...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Empty State */}
        {!loading && Array.isArray(events) && events.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🎉</p>
            <h3 className="text-2xl font-semibold text-secondary mb-2">
              No Upcoming Events
            </h3>
            <p className="text-gray-600">
              New events are coming soon. Stay tuned!
            </p>
          </div>
        )}

        {/* Events Grid */}
        {Array.isArray(events) && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-secondary mb-2 truncate">
                    {event.title}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {formatDate(event.date)} at {formatTime(event.time)}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Location: {event.location}
                  </p>
                  <p className="text-gray-700 mb-4 truncate">
                    {event.description}
                  </p>
                  <button
                    onClick={() => handleLearnMore(event)}
                    className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
