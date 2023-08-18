import React, { useState, useEffect } from 'react';
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

  const handleDeleteQuestion = async (questionId) => {
    const db = firebase.firestore();
    await db.collection('quizzes').doc(questionId).delete();
  };

  const handleSaveEditedQuestion = async (questionId, updatedQuestion) => {
    const db = firebase.firestore();
    await db.collection('quizzes').doc(questionId).update(updatedQuestion);
    setEditingQuestion(null);
  };

  const EditQuestionForm = ({ question, onCancel, onSave }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleEditSubmit = (e) => {
      e.preventDefault();
      onSave(editedQuestion);
    };

    return (
      <Form onSubmit={handleEditSubmit}>
        <Form.Group>
          <Form.Label>Edit Question</Form.Label>
          <Form.Control
            type="text"
            value={editedQuestion.question}
            onChange={(e) =>
              setEditedQuestion({
                ...editedQuestion,
                question: e.target.value,
              })
            }
          />
        </Form.Group>
        {/* ... other inputs ... */}
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
        <Button variant="link" onClick={onCancel}>
          Cancel
        </Button>
      </Form>
    );
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* ... your form inputs ... */}
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
            <Button variant="link" onClick={() => setEditingQuestion(q.id)}>
              Edit
            </Button>
            <Button variant="link" onClick={() => handleDeleteQuestion(q.id)}>
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
    </div>
  );
}

export default QuizForm;
