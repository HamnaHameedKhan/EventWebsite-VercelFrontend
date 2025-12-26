import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserFailure, editUserRequest, editUserSuccess } from '../../redux/authSlice';
import axios from '../../axios/axios';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId= useSelector((state) => state.auth.user.id);
  console.log(userId)

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleEditClick = () => {
    setIsEditing(true);
    
  };

  const handleSaveClick = async () => {
    try {
      dispatch(editUserRequest());
      console.log('userId:', userId)
      const res = await axios.put(`/updateUser/${userId}`, {id: userId, username, email});
      console.log('res.data:', res.data)
      dispatch(editUserSuccess(res.data));
      setUsername(res.data.username);
      setEmail(res.data.email);
      setIsEditing(false);
    } catch (error) {
      dispatch(editUserFailure());
      console.log('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ) : (
          <p className="text-lg">{user.username}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ) : (
          <p className="text-lg">{user.email}</p>
        )}
      </div>
      <div>
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
