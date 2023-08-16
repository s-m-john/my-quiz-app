import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';


import isEmpty from '../../utils/is-empty';

import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';
import classnames from 'classnames';

class ApiPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [], // Store questions from the API
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
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            previousRandomNumbers: [],
            time: {}
        };
        this.interval = null;
        this.correctSound = React.createRef();
        this.wrongSound = React.createRef();
        this.buttonSound = React.createRef();
    }

    async componentDidMount() {
        try {
            // Fetch only the necessary fields from the API
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital');
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }
            const countries = await response.json();

            // Extract country names and capitals from the fetched data
            const questions = countries.map(country => ({
                question: country.name.common,
                answer: country.capital ? country.capital[0] : 'Unknown',
            }));

            this.setState(
                {
                    questions,
                },
                () => {
                    this.displayQuestions(this.state.questions);
                    this.startTimer();
                }
            );
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }


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
                answer,
                previousRandomNumbers: []
            }, () => {
                //this.showOptions();
                this.handleDisabledButton();
            });
        }
    };


    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                this.correctSound.current.play();
            }, 500); // 500ms delay before next question so sound can play.
            this.correctAnswer();
        } else {
            setTimeout(() => {
            this.wrongSound.current.play();
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
        this.buttonSound.current.play();
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
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }


    wrongAnswer = () => {
        if (navigator.vibrate) {
        navigator.vibrate(1000); // vibrate for 1000ms when incorrect answer
        }
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
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    startTimer = () => {
        const countDownTime = Date.now() + 900000; // 15 minutes from now
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
                    this.endGame();
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

    handleDisabledButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            });
        }
    }

    endGame = () => {
        alert('Quiz has ended!');
        const { state } = this;
        const playerStats = {
            score: this.state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/play/quizSummary', playerStats);
        }, 1000);
    }


    render() {
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, time } = this.state;

        return (
            <Fragment>
                {/* Set the page title */}
                <Helmet>
                    <title>Quiz App - Play</title>
                </Helmet>
                {/* Load audio elements */}
            <audio ref={this.correctSound} src={correctNotification}></audio>
            <audio ref={this.wrongSound} src={wrongNotification}></audio>
            <audio ref={this.buttonSound} src={buttonSound}></audio>

            {/* Main content */}
            <div className="questions">
                <h2>Quiz Mode</h2>
                <div className="timer-container">
                    <p>
                        {/* Display current question number and timer  */}
                        <span className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                        <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                    </p>
                </div>
                <h5>What is the capital of {currentQuestion.name.common}?</h5>
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
                    <button
                        className={classnames('', {'disable': this.state.previousButtonDisabled})} 
                        id="previous-button" 
                        onClick={this.handleButtonClick}>
                        Previous
                    </button>
                    <button 
                        className={classnames('', {'disable': this.state.nextButtonDisabled})}
                        id="next-button" 
                        onClick={this.handleButtonClick}>
                        Next
                    </button>
                    <button 
                        id="quit-button" 
                        onClick={this.handleButtonClick}>
                        Quit
                    </button>
                </div>
            </div>
        </Fragment>
        );
    }   
}

export default ApiPlay;

