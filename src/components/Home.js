import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
            <section>
                <div style={{textAlign: 'center'}}>
                    <span className="mdi mdi-earth earth"></span>
                </div>
                <h1>Geo Quiz App</h1>
                <div className="play-button-container">
                    <ul>
                        <li><Link className="play-button" to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    {/* <Link to="/login" className="auth-buttons" id="login-button">Login</Link> */}
                    {/* <Link to="/register" className="auth-buttons" id="signup-button">Sign up</Link> */}
                    <button className="auth-buttons" id="login-button">
                        <Link to="/login">Login</Link>
                    </button>
                    <button className="auth-buttons" id="signup-button">
                        <Link to="/register">Sign up</Link>
                    </button>
                </div>
            </section>
        </div>
    </Fragment>
);

export default Home;
