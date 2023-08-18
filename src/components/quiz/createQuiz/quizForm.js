import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestore } from '../../../firebase/firebaseConfig'; // Adjust the path based on your file structure
import '../../../styles/components/_quizForm.scss'; // Make sure to adjust the path to your stylesheet

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
      // Save quizData to Firestore
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
    <div className="quiz-form-container">
      <Form onSubmit={handleSubmit}>
        {/* ... form fields ... */}
        <Button variant="primary" type="submit">
          Create Quiz
        </Button>
      </Form>

      {/* Render EditQuestionForm when editing */}
      <EditQuestionForm
        question={question}
        optionA={optionA}
        optionB={optionB}
        optionC={optionC}
        optionD={optionD}
        correctAnswer={correctAnswer}
        timer={timer}
      />
    </div>
  );
}

export default QuizForm;
