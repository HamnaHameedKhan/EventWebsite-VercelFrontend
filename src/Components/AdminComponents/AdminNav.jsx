import React from 'react';
import { FaCalendarAlt, FaClipboardList, FaUsers,FaPlus } from 'react-icons/fa';

const AdminNav = ({ setActiveComponent }) => {
  return (
    <div className="w-64 bg-secondary text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul>
          <li
            className="mb-4 cursor-pointer flex items-center hover:bg-secondary p-2 rounded"
            onClick={() => setActiveComponent('EventManagement')}
          >
            <FaCalendarAlt className="mr-2" /> Event Management
          </li>
          <li
            className="mb-4 cursor-pointer flex items-center hover:bg-secondary p-2 rounded"
            onClick={() => setActiveComponent('BookingManagement')}
          >
            <FaClipboardList className="mr-2" /> Booking Management
          </li>
          <li
            className="mb-4 cursor-pointer flex items-center hover:bg-secondary p-2 rounded"
            onClick={() => setActiveComponent('UserManagement')}
          >
            <FaUsers className="mr-2" /> User Management
          </li>
          <li
            className="mb-4 cursor-pointer flex items-center hover:bg-secondary p-2 rounded"
            onClick={() => setActiveComponent('EventForm')}
          >
            <FaPlus className="mr-2" /> Create Event
          </li>
         
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
