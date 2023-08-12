import React from 'react';
import UserList from '../components/user/UserList';

const AdminView = () => {
  console.log('AdminView rendered'); // Add this line
  return (
    <div>
      <h1>Admin View</h1>
      {/* Other admin-related content */}
      <UserList /> {/* Include the UserList component */}
    </div>
  );
};

export default AdminView;
