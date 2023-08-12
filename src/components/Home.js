import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '20px' }}>
                <Link className="admin-button" to="/admin">Admin</Link>
                <Link className="create-question-button" to="/create/question">Create Your Own Quiz</Link>
            </div>
            <section>
                <div style={{ textAlign: 'center' }}>
                    <span className="mdi mdi-earth earth"></span>
                </div>
                <h1>Geo Quiz App</h1>
                <div className="play-button-container">
                    <ul>
                        <li><Link className="play-button" to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
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
