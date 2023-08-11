// src/views/AdminView.js
import React from 'react';
import UserList from '../components/user/UserList';

const AdminView = () => {
  return (
    <div>
      <h1>Admin View</h1>
      {/* Other admin-related content */}
      <UserList /> {/* Include the UserList component */}
    </div>
  );
};

export default AdminView;
