import React from 'react';

class ClassComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello from Class Component</h1>
            </div>
        );
    }
}

const FunctionalComponent = (props) => {
    return (
        <p>Hello {props.name}</p>
    );
};

export {FunctionalComponent, ClassComponent};