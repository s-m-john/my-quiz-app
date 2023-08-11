// src/pages/CreateQuestionPage.js (or any other component)
import React, { useState, useEffect } from 'react';
import quizApi from '../api/quizApi';

const CreateQuestionPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the quizApi
    quizApi.fetchQuestions()
      .then((fetchedQuestions) => {
        setQuestions(fetchedQuestions);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  // Render questions
  return (
    <div>
      <h2>Quiz Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateQuestionPage;
