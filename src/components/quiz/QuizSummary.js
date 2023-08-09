import React, { Component,Fragment } from 'react';
import { Helmet } from 'react-helmet';


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

        this.componentDidMount = () => {
            const { state } = this.props.location;
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
            });
        }
    }
    render() {
        //console.log(this.props);
        const { state } = this.props.location;
        let stats;
        if (state !== undefined) {
            stats = (<h1>Stats are available</h1>);
            
        } else (<h1>No Stats available. Please take a quiz.</h1>);

        return (
            <Fragment>
                <Helmet><title>Quiz App - Summary</title></Helmet>
                {stats}
            </Fragment>
        );
    }
}

export default QuizSummary;