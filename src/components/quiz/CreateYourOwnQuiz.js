import React, { useState } from 'react';
// eslint-disable-next-line
import { firestore } from '../../firebase/firebaseConfig';
import '../../styles/components/_create-your-own-quiz.scss';

const CreateYourOwnQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [timer, setTimer] = useState('');

  // eslint-disable-next-line
  const handleQuestionChange = (e) => {
    setCurrentQuestion(e.target.value);
  };

  // eslint-disable-next-line
  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  // eslint-disable-next-line
  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  // eslint-disable-next-line
  const handleTimerChange = (e) => {
    setTimer(e.target.value);
  };

  // eslint-disable-next-line
  const addQuestion = () => {
    const newQuestion = {
      question: currentQuestion,
      options: options,
      correctAnswer: correctAnswer,
      timer: timer,
    };
    setQuestions([...questions, newQuestion]);

    setCurrentQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setTimer('');
  };

  return (
    <div className="create-quiz-container">
      {/* ...rest of the component JSX... */}
    </div>
  );
};

export default CreateYourOwnQuiz;
