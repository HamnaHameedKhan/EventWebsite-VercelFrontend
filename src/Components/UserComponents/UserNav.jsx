import React from 'react';
import { FaUserCircle, FaTicketAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const UserNav = ({ setActiveComponent }) => {
  return (
    <div className="w-64 bg-secondary text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
      <nav>
        <ul>
          <li
            className="mb-4 cursor-pointer flex items-center hover:bg-secondary p-2 rounded"
            onClick={() => setActiveComponent('UserProfile')}
          >
            <FaUserCircle className="mr-2" /> Profile
          </li>
          <li
            className="mb-4 cursor-pointer flex items-center hover:bg-secondary p-2 rounded"
            onClick={() => setActiveComponent('UserBookings')}
          >
            <FaTicketAlt className="mr-2" /> Bookings
          </li>
          {/* Add more navigation items if needed */}
        </ul>
      </nav>
    </div>
  );
};

export default UserNav;
