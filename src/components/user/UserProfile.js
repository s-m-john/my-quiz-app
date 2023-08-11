import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase/firebaseConfig';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get the currently authenticated user
    const user = auth.currentUser;

    if (user) {
      // Get the user's UID (unique identifier)
      const uid = user.uid;

      // Retrieve additional user data from Firestore
      const userRef = firestore.collection('users').doc(uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          // Set the user data to the retrieved document
          setUserData(doc.data());
        } else {
          console.log('No such document!');
        }
      });
    }
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Display Name</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.email}</td>
              <td>{userData.displayName}</td>
              <td>{userData.uid}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
