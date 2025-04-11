import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BorewellConnections from './components/BorewellConnections';
import CropInfo from './components/CropInfo';
import MotorSchedule from './components/MotorSchedule';
import History from './components/History';
import Menu from './components/Menu';
import LoginPage from './components/LoginPage';
import './App.css';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUser(token);
  }, []);

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
     <video autoPlay muted loop className="bg-video">
    <source src="/login-bg.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
      <div>
        {user && <Menu user={user} setUser={setUser} />}

        <Routes>
          <Route path="/login" element={user ? <Navigate to="/borewell-connections" /> : <LoginPage setUser={setUser} />} />
          <Route path="/" element={<Navigate to="/borewell-connections" />} />
          <Route path="/borewell-connections" element={<ProtectedRoute element={<BorewellConnections user={user} />} />} />
          <Route path="/crop-info" element={<ProtectedRoute element={<CropInfo />} />} />
          <Route path="/motor-schedule" element={<ProtectedRoute element={<MotorSchedule />} />} />
          <Route path="/history" element={<ProtectedRoute element={<History />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
