import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestore } from '../../../firebase/firebaseConfig';
import '../../../styles/components/_quizForm.scss';

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
      await firestore.collection('quizzes').add(quizData);

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
        <Form.Group>
          <Form.Label>Enter Question</Form.Label>
          <Form.Control
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Group>

        <div className="options-row">
          <Form.Group>
            <Form.Label>A</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>B</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="options-row">
          <Form.Group>
            <Form.Label>C</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>D</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter D"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
            />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit">
          Create Quiz
        </Button>
      </Form>

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
