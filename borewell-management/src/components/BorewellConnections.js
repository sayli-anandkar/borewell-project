import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/borewell/${userId}`)
        .then((res) => setConnections(res.data))
        .catch((err) => {
          console.error('Error fetching entries:', err);
          setError('Error fetching borewell entries');
        });
    } else {
      setError('User not logged in!');
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConnection({ ...newConnection, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!userId) {
      setLoading(false);
      return setError('You must be logged in to add borewell connections.');
    }

    const { borewellId, connectedTo, distance, speed, startTime } = newConnection;
    if (!borewellId || !connectedTo || !distance || !speed || !startTime) {
      setLoading(false);
      return setError('Please fill all fields and ensure you are logged in');
    }

    if (isNaN(distance) || distance <= 0 || isNaN(speed) || speed <= 0) {
      setLoading(false);
      return setError('Distance and Speed must be valid numbers');
    }

    try {
      const response = await axios.post('http://localhost:5000/borewell', {
        userId,
        borewellId,
        connectedTo,
        distance,
        speed,
        startTime,
      });

      setConnections([...connections, response.data.entry]);
      setNewConnection({
        borewellId: '',
        connectedTo: '',
        distance: '',
        speed: '',
        startTime: getCurrentDateTimeLocal(),
      });
    } catch (err) {
      console.error('Failed to add entry:', err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/borewell/${id}/${userId}`);
      setConnections(connections.filter((conn) => conn.id !== id));
    } catch (err) {
      console.error('Failed to delete entry:', err);
      setError('Failed to delete entry');
    }
  };

  return (
    <div className="container">
      <h2>🔗 Borewell Connections</h2>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="borewellId"
          placeholder="Borewell ID"
          value={newConnection.borewellId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="connectedTo"
          placeholder="Connected To"
          value={newConnection.connectedTo}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="distance"
          placeholder="Distance (meters)"
          value={newConnection.distance}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="speed"
          placeholder="Speed (liters/hour)"
          value={newConnection.speed}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="startTime"
          value={newConnection.startTime}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add Connection'}
        </button>
      </form>

      <div>
        <h3>Connections:</h3>
        <div className="scrollable-container">
          {connections.map((conn) => (
            <div key={conn.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p><strong>Borewell ID:</strong> {conn.borewellId}</p>
              <p><strong>Connected To:</strong> {conn.connectedTo}</p>
              <p><strong>Distance:</strong> {conn.distance} meters</p>
              <p><strong>Speed:</strong> {conn.speed} liters/hour</p>
              <p><strong>Start Time:</strong> {new Date(conn.startTime).toLocaleString()}</p>
              <button onClick={() => handleDelete(conn.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorewellConnections;
