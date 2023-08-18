import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/firestore';

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

    // Save quizData to Firebase
    const db = firebase.firestore();
    await db.collection('quizzes').add(quizData);

    // Clear form inputs
    setQuestion('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectAnswer('');
    setTimer('');
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
