import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
            <section>
                <div>
                    <span className="mdi mdi-cube-outline mdi-48px"></span>
                </div>
                <h1>Quiz App</h1>
            </section>
        </div>
    </Fragment>
    
);

export default Home;
