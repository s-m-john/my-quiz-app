import React, { useState } from 'react';
import { firestore } from '../../firebase/firebaseConfig';
import '../../styles/components/_play.scss';


const CreateYourOwnQuiz = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const [timer, setTimer] = useState(15); // Set the default timer value

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index) => {
    setCorrectOption(index);
  };

  const handleTimerChange = (event) => {
    setTimer(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new question document in Firestore
      await firestore.collection('questions').add({
        question,
        options,
        correctOption,
        timer,
      });

      // Reset the form
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectOption(0);
      setTimer(15);

      // Success message or redirect to the questions list
      console.log('Question created successfully.');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            Option {index + 1}:
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </label>
          <label>
            <input
              type="radio"
              value={index}
              checked={correctOption === index}
              onChange={() => handleCorrectOptionChange(index)}
            />
            Correct Option
          </label>
        </div>
      ))}
      <label>
        Timer (minutes):
        <input type="number" value={timer} onChange={handleTimerChange} />
      </label>
      <button type="submit">Create Question</button>
    </form>
  );
};

export default CreateYourOwnQuiz;

