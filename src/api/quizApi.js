// src/api/quizApi.js
const quizApi = {
  fetchQuestions: async () => {
    try {
      // Fetch questions from questions.json (assuming it's in the src directory)
      const response = await fetch('/questions.json');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const questions = await response.json();
      return questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },
};

export default quizApi;












// // Example usage in a component (CreateQuestionPage.js or another component)
// import React, { useState, useEffect } from 'react';
// import quizApi from '../api/quizApi';

// const CreateQuestionPage = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     // Fetch questions from the quizApi mock API
//     quizApi.fetchQuestions()
//       .then((fetchedQuestions) => {
//         setQuestions(fetchedQuestions);
//       })
//       .catch((error) => {
//         console.error('Error fetching questions:', error);
//       });
//   }, []);

//   // Render questions
//   return (
//     <div>
//       <h2>Quiz Questions</h2>
//       <ul>
//         {questions.map((question) => (
//           <li key={question.id}>{question.question}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CreateQuestionPage;
