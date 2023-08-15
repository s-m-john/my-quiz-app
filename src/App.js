import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import QuizInstructions from './components/quiz/QuizInstructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminView from './views/AdminView';
import CreateQuestionForm from './components/CreateQuestionForm';
import CreateQuestionPage from './pages/CreateQuestionPage';
import CreateYourOwnQuiz from './components/quiz/CreateYourOwnQuiz';




function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/instructions" element={<QuizInstructions />} />
        <Route path="/play/Quiz" element={<Play />} />
        <Route path="/play/quizSummary" element={<QuizSummary />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminView />} /> 
        <Route path="/create/question" element={<CreateQuestionForm />} />
        <Route path="/questions" element={<CreateQuestionPage />} />
        <Route path="/create/your-own-quiz" element={<CreateYourOwnQuiz />} />
      </Routes>
  );
}

export default App;
