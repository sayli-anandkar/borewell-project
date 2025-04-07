// src/components/BorewellConnections.js
import React, { useState } from 'react';

const BorewellConnections = () => {
  const [connections, setConnections] = useState([]);

  const [newConnection, setNewConnection] = useState({
    borewellId: '',
    connectedTo: '',
    distance: '',
    speed: '',
    startTime: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConnection({ ...newConnection, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConnections([...connections, newConnection]);
    setNewConnection({
      borewellId: '',
      connectedTo: '',
      distance: '',
      speed: '',
      startTime: ''
    });
  };

  return (
    <div className="container">
      <h2>🔗 Borewell Connections</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="borewellId"
          placeholder="Borewell ID"
          value={newConnection.borewellId}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="connectedTo"
          placeholder="Connected To"
          value={newConnection.connectedTo}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="number"
          name="distance"
          placeholder="Distance (meters)"
          value={newConnection.distance}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="number"
          name="speed"
          placeholder="Water Transfer Speed (liters/hour)"
          value={newConnection.speed}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="datetime-local"
          name="startTime"
          value={newConnection.startTime}
          onChange={handleInputChange}
          className="input-field"
        />
        <button type="submit" className="btn">Add Connection</button>
      </form>

      <div className="connection-list">
        <h3>Added Connections:</h3>
        {connections.map((connection, index) => (
          <div key={index} className="connection-item">
            <p>Borewell ID: {connection.borewellId}</p>
            <p>Connected To: {connection.connectedTo}</p>
            <p>Distance: {connection.distance} meters</p>
            <p>Speed: {connection.speed} liters/hour</p>
            <p>Start Time: {new Date(connection.startTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorewellConnections;
