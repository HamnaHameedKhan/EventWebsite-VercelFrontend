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

const EventForm = ({setActiveComponent}) => {

    // const [activeComponent, setActiveComponent] = useState('EventManagement');

  const dispatch = useDispatch();
  const { isEditing, editEventId, formData } = useSelector((state) => state.event);

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    image: null, // this will hold new uploaded file
    imageName: '', // this will hold current image name for display
  });

  const [loading, setLoading] = useState(false);

  // Populate form on edit
  useEffect(() => {
    if (isEditing && formData) {
      setFormState({
        ...formData,
        image: null, // user can optionally upload new file
        imageName: formData.image ? getFileName(formData.image) : '',
      });
    } else {
      setFormState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        image: null,
        imageName: '',
      });
    }
  }, [isEditing, formData]);

  // Helper to extract file name from URL
  function getFileName(url) {
    if (!url) return '';
    return url.split('/').pop();
  }

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState({ ...formState, image: file, imageName: file.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: do not require image if editing
    if (
      !formState.title ||
      !formState.description ||
      !formState.location ||
      !formState.time ||
      !formState.price ||
      !formState.date
    ) {
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
      setLoading(true);
      if (isEditing) {
        dispatch(editEventRequest());
        const res = await axios.put(`/update/${editEventId}`, formDataToSend, config);
        dispatch(editEventSuccess(res.data));
        toast.success('Event updated successfully');
        setActiveComponent('EventManagement');
      } else {
        dispatch(createEventRequest());
        const res = await axios.post('/create', formDataToSend, config);
        dispatch(createEventSuccess(res.data));
        toast.success('Event created successfully');
      }
      dispatch(resetForm());
      setActiveComponent('EventManagement');
    } catch (error) {
      console.error(error);
      if (isEditing) {
  const errorMessage =
    error?.response?.data?.msg || error.message || 'Something went wrong';
  dispatch(editEventFailure(errorMessage));
  toast.error(errorMessage);
}else {
  // Only store a string message, not the whole AxiosError
  const errorMessage =
    error?.response?.data?.msg || error.message || 'Something went wrong';
  dispatch(createEventFailure(errorMessage));
  toast.error(errorMessage);
}
    } finally {
      setLoading(false);
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
        <div>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="p-2 border rounded w-full"
          />
          {formState.imageName && (
            <p className="text-gray-600 mt-1 text-sm">
              Current file: {formState.imageName}
            </p>
          )}
        </div>
      </div>
      <textarea
        name="description"
        value={formState.description}
        onChange={handleInputChange}
        placeholder="Event Description"
        className="w-full p-2 border rounded mb-4"
      ></textarea>
      <button
        type="submit"
        className={`bg-primary text-white px-4 py-2 rounded flex items-center justify-center`}
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            {isEditing ? 'Updating...' : 'Creating...'}
          </>
        ) : (
          isEditing ? 'Update Event' : 'Create Event'
        )}
      </button>
    </form>
  );
};

export default EventForm;
