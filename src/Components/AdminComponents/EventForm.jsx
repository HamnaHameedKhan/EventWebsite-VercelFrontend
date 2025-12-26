import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../axios/axios';
import {
  createEventRequest,
  createEventSuccess,
  createEventFailure,
  editEventRequest,
  editEventSuccess,
  editEventFailure,
  resetForm,
} from '../../redux/eventSlice';


const EventForm = ({ setActiveComponent}) => {
  const dispatch = useDispatch();
  const { isEditing, editEventId, formData } = useSelector((state) => state.event);

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    if (isEditing) {
      setFormState(formData);
    } else {
      setFormState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        image: null,
      });
    }
  }, [isEditing, formData]);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormState({ ...formState, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.title || !formState.description || !formState.location || !formState.time || !formState.price || !formState.image || !formState.date) {
      toast.error('Please fill all the fields');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formState.title);
    formDataToSend.append('description', formState.description);
    formDataToSend.append('location', formState.location);
    formDataToSend.append('time', formState.time);
    formDataToSend.append('price', formState.price);
    formDataToSend.append('date', formState.date);
    if (formState.image) {
      formDataToSend.append('image', formState.image);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      if (isEditing) {
        dispatch(editEventRequest());
        const res = await axios.put(`/update/${editEventId}`, formDataToSend, config);
        dispatch(editEventSuccess(res.data));
        toast.success('Event updated successfully');
      } else {
        dispatch(createEventRequest());
        const res = await axios.post('/create', formDataToSend, config);
        dispatch(createEventSuccess(res.data));
        // setActiveComponent('EventManagement')
        toast.success('Event created successfully');
        
      }
      dispatch(resetForm());
    } catch (error) {
      console.error(error);
      if (isEditing) {
        dispatch(editEventFailure(error.response.data.msg));
        toast.error('Error updating event');
      } else {
        dispatch(createEventFailure(error));
        toast.error('Error creating event');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
          placeholder="Event Title"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={formState.location}
          onChange={handleInputChange}
          placeholder="Event Location"
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formState.date}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          type="time"
          name="time"
          value={formState.time}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formState.price}
          onChange={handleInputChange}
          placeholder="Ticket Price"
          className="p-2 border rounded"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="p-2 border rounded"
        />
      </div>
      <textarea
        name="description"
        value={formState.description}
        onChange={handleInputChange}
        placeholder="Event Description"
        className="w-full p-2 border rounded mb-4"
      ></textarea>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        {isEditing ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
