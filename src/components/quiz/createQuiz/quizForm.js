import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { firestore, auth } from '../../../firebase/firebaseConfig'; // Adjust the path based on your file structure

import EditQuestionForm from './EditQuestionForm';

function QuizForm() {
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [timer, setTimer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      question,
      options: { A: optionA, B: optionB, C: optionC, D: optionD },
      correctAnswer,
      timer: parseInt(timer),
    };

    try {
      // Save quizData to Firebase
      await firestore.collection('quizzes').add(quizData);

      // Clear form inputs
      setQuestion('');
      setOptionA('');
      setOptionB('');
      setOptionC('');
      setOptionD('');
      setCorrectAnswer('');
      setTimer('');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* ... form fields ... */}
      <Button variant="primary" type="submit">
        Create Quiz
      </Button>
    </Form>
  );
}

export default QuizForm;
