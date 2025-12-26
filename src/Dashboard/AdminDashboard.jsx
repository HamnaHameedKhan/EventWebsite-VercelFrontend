import React, { useState } from 'react';
import AdminNav from '../Components/AdminComponents/AdminNav';
import EventManagement from '../Components/AdminComponents/EventManagement';
import BookingManagement from '../Components/AdminComponents/BookingManagement';
import UserManagement from '../Components/AdminComponents/UserManagement';
import EventForm from '../Components/AdminComponents/EventForm';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('EventManagement');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'EventManagement':
        return <EventManagement setActiveComponent={setActiveComponent} />;
      case 'BookingManagement':
        return <BookingManagement />;
      case 'UserManagement':
        return <UserManagement />;
        case 'EventForm':
          return <EventForm />;
      default:
        return <EventManagement  />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <AdminNav setActiveComponent={setActiveComponent} />

      <div className="flex-1 p-6 bg-gray-100">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
