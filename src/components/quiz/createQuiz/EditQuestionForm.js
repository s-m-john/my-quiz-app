import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore, auth } from '../../../firebase/firebaseConfig'; // Adjust the path based on your file structure

function EditQuestionForm({ question, onCancel, onSave }) {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onSave(editedQuestion);
  };

  const handleDeleteQuestion = async () => {
    try {
      await firestore.collection('quizzes').doc(question.id).delete();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleSaveEditedQuestion = async () => {
    try {
      const user = auth.currentUser; // Get the authenticated user
      if (user) {
        // Use the user.uid or other properties as needed
      }

      await firestore.collection('quizzes').doc(question.id).update(editedQuestion);
      onCancel(); // Exit editing mode
    } catch (error) {
      console.error('Error saving edited question:', error);
    }
  };

  return (
    <Form onSubmit={handleEditSubmit}>
      <Form.Group>
        <Form.Label>Correct Answer: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Please enter A, B, C, or D"
          value={editedQuestion.question}
          onChange={(e) =>
            setEditedQuestion({
              ...editedQuestion,
              question: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Hints: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Optional"
          value={editedQuestion.correctAnswer}
          onChange={(e) =>
            setEditedQuestion({
              ...editedQuestion,
              correctAnswer: e.target.value,
            })
          }
        />
      </Form.Group>
      <Button className="btn-danger" variant="save" type="submit">
        Save
      </Button>
      <Button variant="link" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="btn-delete-question" variant="danger" onClick={() => handleDeleteQuestion(question.id)}>
        Delete
      </Button>
    </Form>
  );
}

export default EditQuestionForm;
