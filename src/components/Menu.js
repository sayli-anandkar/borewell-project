// src/components/Menu.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation(); // gets current route path

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container">
      <h2>🏠 Menu</h2>
      <ul className='menu'>
        <li className={isActive('/borewell-connections') ? 'active' : ''}>
          <Link to="/borewell-connections">Borewell Connections</Link>
        </li>
        <li className={isActive('/crop-info') ? 'active' : ''}>
          <Link to="/crop-info">Crop Info</Link>
        </li>
        <li className={isActive('/motor-schedule') ? 'active' : ''}>
          <Link to="/motor-schedule">Motor Schedule</Link>
        </li>
        <li className={isActive('/history') ? 'active' : ''}>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
