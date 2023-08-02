import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';

import questions from '../../questions.json';
class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
        questions: [],
        currentQuestion: {},
        nextQuestion: {},
        previousQuestion: {},
        answer: '',
        numberOfQuestions: 0,
        numberOfAnsweredQuestions: 0,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        time: {}

        };
    }

    
        
    //constructor(props) {
        //super(props);
        /*this.state = {
            counter: 0
        };*/
    //}

    // increaseCount = () => {
    //     this.setState({
    //         counter: 5
    //         //counter: this.state.counter + 1
    //     });
    // };

    displayQuestions = (questions = this.state.questions, currentQuestions, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
    };
    render() {
        console.log(questions);
        return (    
            // Testing Counter
            /*<div>
                <p>Counter: {this.state.counter}</p>
            <button onClick={this.increaseCount}>Click Me</button>
            </div> */
            <Fragment>
                <Helmet><title>Quiz App - Play</title></Helmet> 
                <div className="questions">
                    <h2>Quiz Mode</h2>
                    <div className="timer-container">
                        <p>
                            <span className="left">1 of 10</span>
                            <span className="right">0:00<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                        </p>
                    </div>

                    <h5>What is the Capital of the United States?</h5>
                    <div className="options-container">
                        <p className="option">Miami</p>
                        <p className="option">New York</p>
                    </div>
                    <div className="options-container">
                        <p className="option">Chicago</p>
                        <p className="option">Washington, D.C.</p>   
                    </div>
                    <div className="button-container">
                        <button>Previous</button>
                        <button>Next</button>
                        <button>Quit</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Play;