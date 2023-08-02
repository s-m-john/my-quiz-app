import React, { Component } from 'react';

class Play extends React {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    increaseCount = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    };

    render() {
        return (
            <div>
                <p>Counter: {this.state.counter}</p>
            <button onClick={this.increaseCount}>Click Me</button>
            </div>
        );
    }
}

export default Play;