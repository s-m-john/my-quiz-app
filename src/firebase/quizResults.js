import { firestore } from './firebaseConfig';

// Store quiz result in Firestore
export const storeQuizResult = async (uid, quizData) => {
  try {
    const quizResultsRef = firestore.collection('quizResults');
    await quizResultsRef.add({ userId: uid, ...quizData });
    return true;
  } catch (error) {
    console.error('Error storing quiz result:', error);
    return false;
  }
};
