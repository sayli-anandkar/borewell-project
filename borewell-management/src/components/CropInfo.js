import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CropInfo = () => {
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({
    cropId: '',
    cropType: '',
    soilType: '',
    waterRequired: '',
    startTime: ''
  });

  const userId = localStorage.getItem('userId'); // Get the current user ID

  useEffect(() => {
    // Fetch the crops data for the current user on component mount
    axios.get(`http://localhost:5000/crop-info/${userId}`)
      .then((response) => {
        setCrops(response.data); // Set crops data for the user
      })
      .catch((err) => {
        console.error('Error fetching crops:', err);
      });
  }, [userId]); // Run once when component mounts
  
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/motor-schedule/${id}/${userId}`);
    setCrops(prev => prev.filter(s => s.id !== id));
  } catch (err) {
    console.error('Delete error', err);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrop({ ...newCrop, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCrop.cropId || !newCrop.cropType || !newCrop.waterRequired) return;

    const cropData = {
      ...newCrop,
      userId: userId // Make sure the userId is attached to the new crop data
    };

    axios.post('http://localhost:5000/crop-info', cropData)
      .then((response) => {
        // After adding, fetch the latest data again to keep it in sync
        setCrops((prevCrops) => [...prevCrops, response.data.entry]); // Add the new crop locally
        setNewCrop({ cropId: '', cropType: '', soilType: '', waterRequired: '', startTime: '' }); // Clear the form
      })
      .catch((err) => {
        console.error('Error adding crop:', err);
      });
  };

  return (
    <div className="container">
      <h2>🌾 Crop Information</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cropId" placeholder="Crop ID" value={newCrop.cropId} onChange={handleInputChange} />
        <input type="text" name="cropType" placeholder="Crop Type" value={newCrop.cropType} onChange={handleInputChange} />
        <input type="text" name="soilType" placeholder="Soil Type" value={newCrop.soilType} onChange={handleInputChange} />
        <input type="number" name="waterRequired" placeholder="Water Required (liters)" value={newCrop.waterRequired} onChange={handleInputChange} />
        <input type="datetime-local" name="startTime" value={newCrop.startTime} onChange={handleInputChange} />
        <button type="submit">Add Crop</button>
      </form>

      <div>
        <h3>Added Crops:</h3>
        {crops.map((crop, index) => (
          <div key={index}>
            <p>Crop ID: {crop.cropId}</p>
            <p>Type: {crop.cropType}</p>
            <p>Soil: {crop.soilType}</p>
            <p>Water Required: {crop.waterRequired} liters</p>
            <p>Start Time: {new Date(crop.startTime).toLocaleString()}</p>
            <button onClick={() => handleDelete(crops.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropInfo;
