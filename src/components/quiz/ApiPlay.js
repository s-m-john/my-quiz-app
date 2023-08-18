import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';


import isEmpty from '../../utils/is-empty';

import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';
// import classnames from 'classnames';
import '../../styles/components/_apiplay.scss';



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

            const selectedCountries = this.selectRandomCountries(countries, 10); //for 10 questions

            // Extract country names and capitals from the fetched data
            const questions = selectedCountries.map(country => ({
                question: `What is the capital of ${country.name.common}?`,
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

    selectRandomCountries = (countries, count) => {
        const selectedCountries = [];
        while (selectedCountries.length < count) {
            const randomIndex = Math.floor(Math.random() * countries.length);
            const randomCountry = countries[randomIndex];
            if (!selectedCountries.includes(randomCountry)) {
                selectedCountries.push(randomCountry);
            }
        }
        return selectedCountries;
    }

    generateRandomCapitals = () => {
        const randomCapitals = [];
        while (randomCapitals.length < 3) {
            const randomIndex = Math.floor(Math.random() * this.state.questions.length);
            const randomCapital = this.state.questions[randomIndex].answer;
            if (!randomCapitals.includes(randomCapital)) {
                randomCapitals.push(randomCapital);
            }
        }
        return randomCapitals;
    };

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            
            const randomCapitals = this.generateRandomCapitals();
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer: currentQuestion.answer,
                previousRandomNumbers: []
            }, () => {
                //this.showOptions();
                this.handleDisabledButton();
                
                this.setState({ previousRandomCapitals: randomCapitals });
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

    handlePreviousButtonClick = () => {
        this.playButtonSound();
        if (this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };

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

    handleQuitButtonClick = () => {
        if (window.confirm('Are you sure you want to quit?')) {
            this.props.history.push('/play/quizSummary');
        }
    };

    handleButtonClick = (e) => {
        switch(e.target.id) {
            case 'previous-button':
                this.handlePreviousButtonClick();
                break;
            case 'next-button':
                this.handleNextButtonClick();
                break;
            case 'quit-button':
                this.handleQuitButtonClick();
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
        if (this.state.numberOfAnsweredQuestions === 10) {
            alert('Quiz has ended!'); // End quiz after 10 questions
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
                            {/* Display current question number and timer */}
                            <span className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                            <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}?</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.answer}</p>
                        {this.state.previousRandomCapitals && this.state.previousRandomCapitals.map((capital, index) => (
                            <p key={index} onClick={this.handleOptionClick} className="option">{capital}</p>
                        ))}

                    </div>
                    <div className="button-container">
                        <button id="previous-button" onClick={this.handleButtonClick} disabled={this.state.previousButtonDisabled}>
                            Previous
                        </button>
                        <button id="next-button" onClick={this.handleButtonClick} disabled={this.state.nextButtonDisabled}>
                            Next
                        </button>
                        <button id="quit-button" onClick={this.handleQuitButtonClick}>
                            Quit
                        </button>
                    </div>

                    
                </div>
            </Fragment>
        );
    }
}

        

export default ApiPlay;

