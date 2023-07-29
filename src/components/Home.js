import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
            <section>
                <div>
                    <span className="mdi mdi-cube-outline cube"></span>
                </div>
                <h1>Quiz App</h1>
                <div className="play-button-container">
                    <ul>
                        <li><Link to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    <Link to="/login" >Login</Link>
                    <Link to="/register">Sign up</Link>
                </div>
            </section>
        </div>
    </Fragment>
);

export default Home;
