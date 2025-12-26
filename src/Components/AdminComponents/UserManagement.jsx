import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/authSlice';
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const dispatch=useDispatch()
  const users = useSelector((state) => state.auth.users); // Get all users from Redux state
  const auth=useSelector((state)=>state.auth.isAuthenticated)
  console.log(auth)

 

  useEffect(() => {
   
      fetchUsers();
    
  },[]);

  const fetchUsers = async () => {
    try {
      const res=await axios.get('/allUsers');
      dispatch(getUsers(res.data))
      console.log("user fetched",res.data)
    
    } catch (error) {
      console.log("error",error)
    }
  };

  const handleUpdateUser = (userId) => {
    // Implement update user functionality
    console.log('Update user', userId);
  };

  const handleDeleteUser = async (userId) => {
    // Implement delete user API call
    await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">User Management</h2>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">All Users</h3>
        <div className="overflow-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.map((user,index) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{index+1}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <i
                    onClick={() => {
                      handleUpdateUser(user);
                    }}
                    className="fas fa-edit cursor-pointer text-secondary"
                  ></i>
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user._id)
                    }}
                    className="fas fa-trash cursor-pointer text-red-500"
                  ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
