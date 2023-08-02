import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const QuizInstructions = () => (
    <Fragment>
        <Helmet><title>Quiz App - Instructions</title></Helmet>
        <div className="instructions container">
            <h1>How to Play the Game</h1>
            <p>Ensure you read this guide from start to finish.</p>
            <ul className="browser-default" id="main-list">
                <li>The game has a duration of 15 minutes and ends as soon as your time elapses.</li>
                <li>Each game consists of 10 questions.</li>
                <li>
                    Every question contains 4 options.
                    {/* <img src={options} alt="Quiz App options example" /> */}
                </li>
                <li>
                    Select the option which best answers the question by clicking (or selecting) it.
                    {/* <img src={answer} alt="Quiz App answer example" /> */}
                    </li>
                <li>Try your best! Part of learning is making mistakes.</li>
                <li>You can quit the game at any time. Your progress will be saved.</li>

            </ul>
            <div>
                <span className="left"><Link to="/">No, take me back</Link></span>
                <span className="right"><Link to="/play/quiz">Okay, Let's do this!</Link></span>
            </div>
        </div>
    </Fragment>
);

export default QuizInstructions;