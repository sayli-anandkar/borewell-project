// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="container">
      <h2>🏠 Menu</h2>
      <ul className='menu'>
        <li><Link to="/borewell-connections">Borewell Connections</Link></li>
        <li><Link to="/crop-info">Crop Info</Link></li>
        <li><Link to="/motor-schedule">Motor Schedule</Link></li>
        <li><Link to="/history">History</Link></li>
      </ul>
    </div>
  );
};

export default Menu;
