import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Make sure this path is correct

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [message, setMessage] = useState(null); // for success or error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Store userId and token in localStorage after login
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);

      // Set user state in parent component (if needed for global state management)
      setUser(response.data.token);
      
      setMessage('Login successful!');
      setMessageType('success');
      
      // You can redirect to the Borewell page, if needed, after successful login
      window.location.href = '/borewell'; // Redirect to the BorewellConnections page
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
      setMessageType('error');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      setMessage(response.data.message || 'Registered successfully!');
      setMessageType('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
      setMessageType('error');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop className="bg-video">
        <source src="/login-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="auth-container">
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loginLoading || registerLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginLoading || registerLoading}
        />

        <button onClick={handleLogin} disabled={loginLoading || registerLoading}>
          {loginLoading ? 'Logging in...' : 'Login'}
        </button>
        <button onClick={handleRegister} disabled={registerLoading || loginLoading}>
          {registerLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
