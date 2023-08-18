function EditQuestionForm({ question, onCancel, onSave }) {
    const [editedQuestion, setEditedQuestion] = useState(question);
  
    const handleEditSubmit = (e) => {
      e.preventDefault();
      onSave(editedQuestion);
    };
  
    const handleDeleteQuestion = async (questionId) => {
        const db = firebase.firestore();
        await db.collection('quizzes').doc(questionId).delete();
      };
    
      const handleSaveEditedQuestion = async (questionId, updatedQuestion) => {
        const db = firebase.firestore();
        await db.collection('quizzes').doc(questionId).update(updatedQuestion);
        setEditingQuestion(null);
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
  }
  