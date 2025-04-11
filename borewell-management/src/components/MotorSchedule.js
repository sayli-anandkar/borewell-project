import React, { useState } from 'react';

const getCurrentDateTimeLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const MotorSchedule = () => {
  const [motorSchedules, setMotorSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    borewellId: '',
    waterAmount: '',
    startTime: getCurrentDateTimeLocal(),
    speed: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { borewellId, waterAmount, startTime, speed } = newSchedule;

    if (!borewellId || !waterAmount || !startTime || !speed) return;
    if (isNaN(waterAmount) || waterAmount <= 0 || isNaN(speed) || speed <= 0) return;

    setMotorSchedules([...motorSchedules, newSchedule]);
    setNewSchedule({
      borewellId: '',
      waterAmount: '',
      startTime: getCurrentDateTimeLocal(),
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
        />
        <input
          type="number"
          name="waterAmount"
          placeholder="Water Amount (liters)"
          value={newSchedule.waterAmount}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="speed"
          placeholder="Speed (liters/hour)"
          value={newSchedule.speed}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="startTime"
          value={newSchedule.startTime}
          onChange={handleInputChange}
        />
        <button type="submit">Schedule Motor</button>
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
