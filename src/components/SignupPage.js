import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../firebase'; // Make sure to import the useFirebase hook
import 'styles/components/_signup.scss'; // Use the path alias

const SignupPage = () => {
  const firebase = useFirebase();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: username,
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-page-bg">
      <div className="signup-container">
        <h2>Sign up</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Sign up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
