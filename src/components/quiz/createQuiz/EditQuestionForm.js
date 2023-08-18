import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Make sure to import Form and Button from react-bootstrap
import firebase from 'firebase/app';
import 'firebase/firestore';

function EditQuestionForm({ question, onCancel, onSave }) {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onSave(editedQuestion);
  };

  const handleDeleteQuestion = async () => {
    const db = firebase.firestore();
    await db.collection('quizzes').doc(question.id).delete();
  };

  const handleSaveEditedQuestion = async () => {
    const db = firebase.firestore();
    await db.collection('quizzes').doc(question.id).update(editedQuestion);
    onCancel(); // Exit editing mode
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
      <Button variant="danger" onClick={() => handleDeleteQuestion(question.id)}>
        Delete Question
      </Button>
    </Form>
  );
}

export default EditQuestionForm;
