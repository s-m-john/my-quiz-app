import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';

import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';

import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';

class Play extends Component {
    constructor (props) {
        super(props);
        this.state = {
            questions,
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
        this.interval = null;
    }

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
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

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer
            });
        }
    };


    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                document.getElementById('correct-sound').play();
            }, 500); // 500ms delay before next question so sound can play.
            this.correctAnswer();
        } else {
            setTimeout(() => {
            document.getElementById('wrong-sound').play();
            }, 500); // 500ms delay before next question so sound can play.
            this.wrongAnswer();
        }
    }

    handleNextButtonClick = () => {
        this.playButtonSound();
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };

    handleButtonClick = (e) => {
        switch(e.target.id) {
            case 'next-button':
                this.handleNextButtonClick();
                break;
                
            default:
                break;
        }
    };

    playButtonSound = () => {
        document.getElementById('button-sound').play();
    };

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }


    wrongAnswer = () => {
        navigator.vibrate(1000); // vibrate for 1000ms when incorrect answer
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            
            wrongAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestions, this.state.nextQuestion, this.state.previousQuestion);
        });
    }

    startTimer = () => {
        const countDownTime = Date.now() + 30000; 
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    alert('Quiz has ended!');
                    this.props.history.push('/')
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000);
    }
     
    

    render() {
        const { currentQuestion, 
            currentQuestionIndex, 
            numberOfQuestions, 
            time
        } = this.state;

        //console.log(questions);
        return (    
            // Testing Counter
            /*<div>
                <p>Counter: {this.state.counter}</p>
            <button onClick={this.increaseCount}>Click Me</button>
            </div> */
            <Fragment>
            {/* Set the page title */}
            <Helmet><title>Quiz App - Play</title></Helmet> 
            {/* Load audio elements */}
            <audio id="correct-sound" src={correctNotification}></audio>
            <audio id="wrong-sound" src={wrongNotification}></audio>
            <audio id="button-sound" src={buttonSound}></audio>

            {/* Main content */}
            <div className="questions">
                <h2>Quiz Mode</h2>
                <div className="timer-container">
                    <p>
                        {/* Display current question number and timer */}
                        <span className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                        <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                    </p>
                </div>
                <h5>{currentQuestion.question}</h5>
                <div className="options-container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                </div>
                <div className="options-container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>   
                </div>
                <div className="button-container">
                    {/* Buttons for navigation */}
                    <button id="previous-button" onClick={this.handleButtonClick}>Previous</button>
                    <button id="next-button" onClick={this.handleButtonClick}>Next</button>
                    <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
                </div>
            </div>
        </Fragment>
        );
    }   
}

export default Play;

