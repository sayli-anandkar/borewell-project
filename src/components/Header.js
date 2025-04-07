// src/components/Header.js
import React, { useState } from 'react';
import axios from 'axios';
import './Header.css';


const Header = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.token);
      alert('Login successful');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      alert('Registration successful');
    } catch (err) {
      alert('Error during registration');
    }
  };

  return (
    <header>
      <h1>Borewell Management System</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </header>
  );
};

export default Header;
