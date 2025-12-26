import React, { useState } from 'react';

import UserProfile from '../Components/UserComponents/UserProfile';
import UserBookings from '../Components/UserComponents/UserBookings';
import UserNav from '../Components/UserComponents/UserNav';

const UserDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('UserProfile');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'UserProfile':
        return <UserProfile />;
      case 'UserBookings':
        return <UserBookings />;
     
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <UserNav setActiveComponent={setActiveComponent} />
      <div className="flex-1 p-6 bg-gray-100">
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserDashboard;
