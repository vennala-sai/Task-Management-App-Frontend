import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
        alert('Signup successful');
        navigate('/');
      } else {
        // Assuming "admin" as the mock username and "password" as the mock password for the presentation
        // Still working on project- for development purposes only
        const mockUsername = 'admin';
        const mockPassword = 'password';

        if (credentials.username === mockUsername && credentials.password === mockPassword) {
            navigate('/'); // Redirect to the task list page after login
        } else {
            // If the credentials don't match, display an error message
            alert('Invalid credentials! Please try again.');
        }
      }
  };

  return (
    
    <div className="login-container">
      <div className="welcome-text">
        Welcome to Task Manager!
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        {isSignup && (
          <input
            type="email"
            placeholder="Email (required for sign-up)"
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required={isSignup}
          />
        )}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        <button type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
