import React from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const UserList = () => {
  const firestore = useFirestore();
  const usersRef = firestore.collection('users');

  const { data: users, status } = useFirestoreCollectionData(usersRef);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      await usersRef.get();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  console.log('UserList rendered');

  return (
    <div>
      <h2>User List</h2>
      <button onClick={fetchUsers}>Fetch Users</button>
      {/* Render user data as needed */}
    </div>
  );
};

export default UserList;
