import React from 'react';
import { useFirestore } from 'reactfire';

const UserList = () => {
  const firestore = useFirestore();
  const usersRef = firestore.collection('users');

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      const snapshot = await usersRef.get();
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc.data());
      });
      console.log('Users:', users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  console.log('UserList rendered'); // Add this line

  return (
    <div>
      <h2>User List</h2>
      <button onClick={fetchUsers}>Fetch Users</button>
      {/* Render user data as needed */}
    </div>
  );
};

export default UserList;
