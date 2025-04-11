import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const userId = localStorage.getItem('userId'); // Get the current user ID

  useEffect(() => {
    // Fetch the motor schedules data for the current user on component mount
    axios.get(`http://localhost:5000/motor-schedule/${userId}`)
      .then((response) => {
        setMotorSchedules(response.data); // Set motor schedules for the user
      })
      .catch((err) => {
        console.error('Error fetching motor schedules:', err);
      });
  }, [userId]); // Run once when component mounts

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/motor-schedule/${id}/${userId}`);
    setMotorSchedules(prev => prev.filter(s => s.id !== id));
  } catch (err) {
    console.error('Delete error', err);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { borewellId, waterAmount, startTime, speed } = newSchedule;

    if (!borewellId || !waterAmount || !startTime || !speed) return;
    if (isNaN(waterAmount) || waterAmount <= 0 || isNaN(speed) || speed <= 0) return;

    const motorData = {
      ...newSchedule,
      userId: userId // Make sure the userId is attached to the new motor schedule data
    };

    axios.post('http://localhost:5000/motor-schedule', motorData)
      .then((response) => {
        // After adding, fetch the latest data again to keep it in sync
        setMotorSchedules((prevSchedules) => [...prevSchedules, response.data.entry]); // Add the new schedule locally
        setNewSchedule({
          borewellId: '',
          waterAmount: '',
          startTime: getCurrentDateTimeLocal(),
          speed: ''
        }); // Clear the form
      })
      .catch((err) => {
        console.error('Error scheduling motor:', err);
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

      <div className="scrollable-container">
        <h3>Motor Schedules:</h3>
        {motorSchedules.map((schedule, index) => (
          <div key={index} className="schedule-item">
            <p>Borewell ID: {schedule.borewellId}</p>
            <p>Water Amount: {schedule.waterAmount} liters</p>
            <p>Speed: {schedule.speed} liters/hour</p>
            <p>Start Time: {new Date(schedule.startTime).toLocaleString()}</p>
            <button onClick={() => handleDelete(schedule.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorSchedule;
