import React, { useState } from 'react';

const getCurrentDateTimeLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const BorewellConnections = () => {
  const [connections, setConnections] = useState([]);
  const [newConnection, setNewConnection] = useState({
    borewellId: '',
    connectedTo: '',
    distance: '',
    speed: '',
    startTime: getCurrentDateTimeLocal(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConnection({ ...newConnection, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { borewellId, connectedTo, distance, speed, startTime } = newConnection;

    if (!borewellId || !connectedTo || !distance || !speed || !startTime) return;
    if (isNaN(distance) || distance <= 0 || isNaN(speed) || speed <= 0) return;

    setConnections([...connections, newConnection]);
    setNewConnection({ borewellId: '', connectedTo: '', distance: '', speed: '', startTime: getCurrentDateTimeLocal() });
  };

  return (
    <div className="container"><div>

      <h2>🔗 Borewell Connections</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="borewellId" placeholder="Borewell ID" value={newConnection.borewellId} onChange={handleInputChange} />
        <input type="text" name="connectedTo" placeholder="Connected To" value={newConnection.connectedTo} onChange={handleInputChange} />
        <input type="number" name="distance" placeholder="Distance (meters)" value={newConnection.distance} onChange={handleInputChange} />
        <input type="number" name="speed" placeholder="Speed (liters/hour)" value={newConnection.speed} onChange={handleInputChange} />
        <input type="datetime-local" name="startTime" value={newConnection.startTime} onChange={handleInputChange} />
        <button type="submit">Add Connection</button>
      </form>

      <div>
        <h3>Connections:</h3>
        {connections.map((conn, index) => (
          <div key={index}>
            <p>Borewell ID: {conn.borewellId}</p>
            <p>Connected To: {conn.connectedTo}</p>
            <p>Distance: {conn.distance} meters</p>
            <p>Speed: {conn.speed} liters/hour</p>
            <p>Start Time: {new Date(conn.startTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BorewellConnections;
