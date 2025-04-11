import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [borewellData, setBorewellData] = useState([]);
  const [cropData, setCropData] = useState([]);
  const [motorData, setMotorData] = useState([]);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      // Fetch borewell data
      axios.get(`http://localhost:5000/borewell/${userId}`)
        .then((res) => setBorewellData(res.data))
        .catch((err) => setError('Error fetching borewell data'));

      // Fetch crop data
      axios.get(`http://localhost:5000/crop-info/${userId}`)
        .then((res) => setCropData(res.data))
        .catch((err) => setError('Error fetching crop data'));

      // Fetch motor schedule data
      axios.get(`http://localhost:5000/motor-schedule/${userId}`)
        .then((res) => setMotorData(res.data))
        .catch((err) => setError('Error fetching motor schedule data'));
    } else {
      setError('User not logged in!');
    }
  }, [userId]);

  // Delete handlers
  const handleDeleteBorewell = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/borewell/${id}/${userId}`);
      setBorewellData(borewellData.filter((entry) => entry.id !== id));
    } catch (err) {
      console.error('Failed to delete borewell entry:', err);
      setError('Failed to delete borewell entry');
    }
  };

  const handleDeleteCrop = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/crop-info/${id}/${userId}`);
      setCropData(cropData.filter((entry) => entry.id !== id));
    } catch (err) {
      console.error('Failed to delete crop entry:', err);
      setError('Failed to delete crop entry');
    }
  };

  const handleDeleteMotor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/motor-schedule/${id}/${userId}`);
      setMotorData(motorData.filter((entry) => entry.id !== id));
    } catch (err) {
      console.error('Failed to delete motor schedule entry:', err);
      setError('Failed to delete motor schedule entry');
    }
  };

  return (
    <div className="container">
      <h2>📜 History</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        <h3>Borewell Connections:</h3>
        <div className="scrollable-container">
          {borewellData.map((entry) => (
            <div key={entry.id}>
              <p><strong>Borewell ID:</strong> {entry.borewellId}</p>
              <p><strong>Connected To:</strong> {entry.connectedTo}</p>
              <p><strong>Distance:</strong> {entry.distance} meters</p>
              <p><strong>Speed:</strong> {entry.speed} liters/hour</p>
              <p><strong>Start Time:</strong> {new Date(entry.startTime).toLocaleString()}</p>
              <button onClick={() => handleDeleteBorewell(entry.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Crop Information:</h3>
        <div className="scrollable-container">
          {cropData.map((entry) => (
            <div key={entry.id}>
              <p><strong>Crop ID:</strong> {entry.cropId}</p>
              <p><strong>Type:</strong> {entry.cropType}</p>
              <p><strong>Soil:</strong> {entry.soilType}</p>
              <p><strong>Water Required:</strong> {entry.waterRequired} liters</p>
              <p><strong>Start Time:</strong> {new Date(entry.startTime).toLocaleString()}</p>
              <button onClick={() => handleDeleteCrop(entry.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Motor Schedules:</h3>
        <div className="scrollable-container">
          {motorData.map((entry) => (
            <div key={entry.id}>
              <p><strong>Borewell ID:</strong> {entry.borewellId}</p>
              <p><strong>Water Amount:</strong> {entry.waterAmount} liters</p>
              <p><strong>Speed:</strong> {entry.speed} liters/hour</p>
              <p><strong>Start Time:</strong> {new Date(entry.startTime).toLocaleString()}</p>
              <button onClick={() => handleDeleteMotor(entry.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
