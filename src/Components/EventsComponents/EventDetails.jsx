import React, { useState,useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import BookingForm from '../Forms/BookingForm'; // Import the BookingForm component
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/axios'
import { getSingleEvent } from '../../redux/eventSlice';
import { useParams } from 'react-router-dom';


const EventDetailsPage = () => {

  const dispatch=useDispatch()
  const event=useSelector((state)=>state.event.singleEvent)
  const {id}=useParams()
 

  const fetchEvent=async()=>{
    try {
      const res=await axios.get(`/singleEvent/${id}`)
      dispatch(getSingleEvent(res.data))
      console.log(res.data)
      
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  }
  useEffect(() => {
    fetchEvent();
  }, []);

  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);

  const handleToggleBookingForm = () => {
    setIsBookingFormVisible(!isBookingFormVisible);
  };

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-6xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-96 object-cover" />
        <div className="p-6 md:flex">
          <div className="md:w-2/3 pr-6">
            <h2 className="text-4xl font-bold text-primary mb-4">{event.title}</h2>
            <p className="text-gray-700 mb-6">{event.description}</p>
          </div>
          <div className="md:w-1/3 pl-6">
            <div className="mb-4">
              <div className="flex items-center text-gray-700 mb-2">
                <FaCalendarAlt className="mr-2 text-secondary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <FaClock className="mr-2 text-secondary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-700 mb-4">
                <FaMapMarkerAlt className="mr-2 text-secondary" />
                <span>{event.location}</span>
              </div>
            </div>
            <div className="mb-4">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                width="100%"
                height="200"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                className="rounded-md"
              ></iframe>
            </div>
            <div className="flex items-center text-gray-700 mb-4">
              <FaDollarSign className="mr-2 text-secondary" />
              <span className="text-2xl font-semibold">{event.price}</span>
            </div>
            <button
              onClick={handleToggleBookingForm}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary transition duration-300"
            >
              {isBookingFormVisible ? 'Hide Booking Form' : 'Book Tickets'}
            </button>
          </div>
        </div>
        {isBookingFormVisible && <BookingForm />} {/* Conditionally render the BookingForm */}
      </div>
    </div>
  );
};

export default EventDetailsPage;
