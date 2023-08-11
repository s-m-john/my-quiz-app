import { firestore } from './firebaseConfig';

// Create a user profile in Firestore
export const createUserProfile = async (uid, userData) => {
  try {
    const userRef = firestore.collection('users').doc(uid);
    await userRef.set(userData);
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

// Retrieve user profile from Firestore
export const getUserProfile = async (uid) => {
  try {
    const userRef = firestore.collection('users').doc(uid);
    const doc = await userRef.get();
    if (doc.exists) {
      return doc.data();
    } else {
      console.error('User profile not found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return null;
  }
};

// Update user profile in Firestore
export const updateUserProfile = async (uid, updatedData) => {
  try {
    const userRef = firestore.collection('users').doc(uid);
    await userRef.update(updatedData);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};
