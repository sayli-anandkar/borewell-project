// src/components/CropInfo.js
import React, { useState } from 'react';

const CropInfo = () => {
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({
    cropId: '',
    cropType: '',
    soilType: '',
    waterRequired: '',
    startTime: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrop({ ...newCrop, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCrops([...crops, newCrop]);
    setNewCrop({
      cropId: '',
      cropType: '',
      soilType: '',
      waterRequired: '',
      startTime: ''
    });
  };

  return (
    <div className="container">
      <h2>🌾 Crop Information</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cropId"
          placeholder="Crop ID"
          value={newCrop.cropId}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="cropType"
          placeholder="Crop Type"
          value={newCrop.cropType}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="soilType"
          placeholder="Soil Type"
          value={newCrop.soilType}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="number"
          name="waterRequired"
          placeholder="Water Required (liters)"
          value={newCrop.waterRequired}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="datetime-local"
          name="startTime"
          value={newCrop.startTime}
          onChange={handleInputChange}
          className="input-field"
        />
        <button type="submit" className="btn">Add Crop</button>
      </form>

      <div className="crop-list">
        <h3>Added Crops:</h3>
        {crops.map((crop, index) => (
          <div key={index} className="crop-item">
            <p>Crop ID: {crop.cropId}</p>
            <p>Type: {crop.cropType}</p>
            <p>Soil: {crop.soilType}</p>
            <p>Water Required: {crop.waterRequired} liters</p>
            <p>Start Time: {new Date(crop.startTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropInfo;
