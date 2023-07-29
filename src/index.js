import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import App from './App';

//ReactDOM.render(<App />, document.getElementById('root'));


// Instead of using ReactDom.render, use createRoot
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
