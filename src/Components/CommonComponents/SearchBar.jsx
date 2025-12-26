import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setLocation, setEventType, setDate, fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } from '../../redux/searchSlice';
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom';
import { searchEventSuccess,createEventRequest } from '../../redux/eventSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const searchEvents = async (searchParams) => {
    try {
      console.log('Search params:', searchParams);
      const response = await axios.get('/searchEvents', { params: searchParams });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching events');
    }
  };

  const handleSearch = async () => {
    dispatch(createEventRequest());
    try {
      const searchParams = {
        searchTerm: document.getElementById('searchTerm').value,
        location: document.getElementById('location').value,
        date: document.getElementById('date').value,
      };

      const events = await searchEvents(searchParams);
      
      dispatch(searchEventSuccess(events));
      console.log(events)
      navigate('/events')
    } catch (error) {
      dispatch(fetchEventsFailure(error.message));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex justify-center py-8 bg-tertiary ">
        <div className="flex items-center bg-white rounded-full shadow-md p-4 w-full max-w-5xl">
          <input
            id="searchTerm"
            type="text"
            placeholder="Search events..."
            className="px-4 py-2 rounded-l-full focus:outline-none w-full"
          />
         <input
            id="location"
            type="text"
            placeholder="Search Location..."
            className="px-4 py-2 rounded-l-full focus:outline-none w-full"
          />
          <input
            id="date"
            type="date"
            className="px-4 py-2 border-l border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-6 py-2 rounded-r-full hover:bg-secondary transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
