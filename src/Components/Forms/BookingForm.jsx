import axios from '../../axios/axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bookingRequest,bookingSuccess,bookingFailure } from '../../redux/bookingSlice';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {

  const selectedEvent=useSelector((state)=>state.event.selectedEvent)
  const userId=useSelector((state)=>state.auth.user)
  console.log(userId.id)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    tickets: '',
  });

  const {fullname,email,phone,tickets}=formData

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    if( !fullname || !email || !phone || !tickets){
      toast.error('Please fill all fields');
      return;
    }

    const config={headers:{
      'Content-Type': 'application/json'
    }}

    const body=JSON.stringify({fullname,email,phone,tickets,eventId:selectedEvent._id,userId:userId.id})
    try {
      dispatch(bookingRequest())
      const res=await axios.post('/bookTicket',body,config)
      dispatch(bookingSuccess(res.data))
      console.log(res.data)
      toast.success('Booking successful')
      navigate('/user')
    } catch (error) {
      console.log(error, "error")
        dispatch(bookingFailure())
        toast.error('Booking failed')
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-primary p-8 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold text-center mb-6 text-background">Book Your Tickets</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-secondary text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-secondary text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-secondary text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-secondary text-sm font-bold mb-2" htmlFor="numberOfTickets">
            Number of Tickets
          </label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-secondary text-sm font-bold mb-2" htmlFor="additionalInfo">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            rows="4"
          ></textarea>
        </div> */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-white hover:text-secondary transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
