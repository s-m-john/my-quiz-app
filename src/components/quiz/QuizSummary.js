import React, { Component } from 'react';

class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        };
    }
    render() {
        console.log(this.props);
        return (
            <h1>Quiz Summary</h1>
        );
    }
}

export default QuizSummary;