// src/components/MotorSchedule.js
import React, { useState } from 'react';

const MotorSchedule = () => {
  const [motorSchedules, setMotorSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    borewellId: '',
    waterAmount: '',
    startTime: '',
    speed: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMotorSchedules([...motorSchedules, newSchedule]);
    setNewSchedule({
      borewellId: '',
      waterAmount: '',
      startTime: '',
      speed: ''
    });
  };

  return (
    <div className="container">
      <h2>⚡ Motor Scheduling</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="borewellId"
          placeholder="Borewell ID"
          value={newSchedule.borewellId}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="number"
          name="waterAmount"
          placeholder="Water Amount (liters)"
          value={newSchedule.waterAmount}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="number"
          name="speed"
          placeholder="Speed (liters/hour)"
          value={newSchedule.speed}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="datetime-local"
          name="startTime"
          value={newSchedule.startTime}
          onChange={handleInputChange}
          className="input-field"
        />
        <button type="submit" className="btn">Schedule Motor</button>
      </form>

      <div className="schedule-list">
        <h3>Motor Schedules:</h3>
        {motorSchedules.map((schedule, index) => (
          <div key={index} className="schedule-item">
            <p>Borewell ID: {schedule.borewellId}</p>
            <p>Water Amount: {schedule.waterAmount} liters</p>
            <p>Speed: {schedule.speed} liters/hour</p>
            <p>Start Time: {new Date(schedule.startTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorSchedule;
