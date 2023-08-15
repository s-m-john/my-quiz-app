import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import '../node_modules/@mdi/font/css/materialdesignicons.min.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.min.js'
import './styles/styles.scss';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App';

//ReactDOM.render(<App />, document.getElementById('root'));


// Instead of using ReactDom.render, use createRoot

// Commented out Aug 11, 2023.
// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);
// root.render(<App />);


// Instead of using ReactDom.render, use createRoot
const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);
const root = createRoot(rootElement);


// Wrap the App component with the Router component
root.render(
  <Router>
    <App />
  </Router>
);