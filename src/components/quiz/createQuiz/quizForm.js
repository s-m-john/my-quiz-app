import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/firestore';

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

  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    // Fetch questions from Firebase on component mount
    const db = firebase.firestore();
    const unsubscribe = db.collection('quizzes').onSnapshot((snapshot) => {
      const loadedQuestions = [];
      snapshot.forEach((doc) => {
        loadedQuestions.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(loadedQuestions);
    });

    return () => unsubscribe();
  }, []);



  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Option A</Form.Label>
            <Form.Control
              type="text"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Option B</Form.Label>
            <Form.Control
              type="text"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Option C</Form.Label>
            <Form.Control
              type="text"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Option D</Form.Label>
            <Form.Control
              type="text"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <Form.Label>Correct Answer</Form.Label>
        <Form.Control
          as="select"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Timer (seconds)</Form.Label>
        <Form.Control
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Quiz
      </Button>
    </Form>

    <hr />

    <h2>Questions List</h2>
    <ul>
    {questions.map((q) => (
        <li key={q.id}>
        {q.question}
        <Button
            variant="link"
            onClick={() => setEditingQuestion(q.id)}
        >
            Edit
        </Button>
        <Button
            variant="link"
            onClick={() => handleDeleteQuestion(q.id)}
        >
            Delete
                </Button>
                {editingQuestion === q.id && (
                <EditQuestionForm
                    question={q}
                    onCancel={() => setEditingQuestion(null)}
                    onSave={(updatedQuestion) =>
                    handleSaveEditedQuestion(q.id, updatedQuestion)
                    }
                />
                )}
            </li>
            ))}
        </ul>
        </Form>
    );
}
    

export default QuizForm;
