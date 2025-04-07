import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import Routes instead of Switch
import BorewellConnections from './components/BorewellConnections';
import CropInfo from './components/CropInfo';
import MotorSchedule from './components/MotorSchedule';
import History from './components/History';
import Menu from './components/Menu';
import Header from './components/Header';
import "./App.css";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <div>
      {/* <Header setUser={setUser} /> */}
        <Menu />
        <Routes>
          <Route path="/borewell-connections" element={<BorewellConnections />} />
          <Route path="/crop-info" element={<CropInfo />} />
          <Route path="/motor-schedule" element={<MotorSchedule />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
