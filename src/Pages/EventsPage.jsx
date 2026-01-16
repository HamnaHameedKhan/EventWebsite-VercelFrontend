import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios/axios';
import { getEvent, createEventRequest, selectEvent } from '../redux/eventSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events, searchedEvents, loading, error } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    const fetchAllEvents = async () => {
      dispatch(createEventRequest());
      try {
        const res = await axios.get('/allEvents');
        dispatch(getEvent(res.data));
      } catch (err) {
        console.error(err);
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
    return `${formattedHours}:${minutes || '00'} ${ampm}`;
  };

  // ✅ ALWAYS choose correct source
  const eventsToDisplay =
    searchedEvents && searchedEvents.length > 0
      ? searchedEvents
      : events || [];

  // ✅ SAFE date+time handler
  const getEventDateTime = (event) => {
    if (event.time) {
      return new Date(`${event.date}T${event.time}`);
    }
    return new Date(event.date); // fallback
  };

  const now = new Date();

  // ✅ SORT UPCOMING FIRST (NO FILTER BUG)
  const sortedEvents = [...eventsToDisplay].sort(
    (a, b) => getEventDateTime(a) - getEventDateTime(b)
  );

  return (
    <div className="bg-background py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-secondary">
            All Events
          </h2>

          {loading && (
            <p className="text-center text-white">Loading events...</p>
          )}

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!loading && sortedEvents.length === 0 && (
            <p className="text-center text-white">
              No events available
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedEvents.map((event) => (
              <div
                key={event._id}
                className="bg-primary rounded-lg shadow-lg overflow-hidden"
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

                  <p className="text-white mb-2">
                    {formatDate(event.date)}
                    {event.time && ` at ${formatTime(event.time)}`}
                  </p>

                  <p className="text-white mb-2">
                    Location: {event.location}
                  </p>

                  <p className="text-white mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <button
                    onClick={() => handleLearnMore(event)}
                    className="bg-secondary text-black py-2 px-4 rounded-lg hover:bg-black hover:text-secondary transition duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;
