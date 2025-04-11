import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ user, setUser }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); // 🔥 This line logs the user out in state
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container">
      <div className='menu-head'>
      <h2>🏠 Menu</h2>
      <button onClick={handleLogout}>Logout</button></div>
      <ul className="menu">
        <li>
          <Link
            to="/borewell-connections"
            className={isActive('/borewell-connections') ? 'active menu-link' : 'menu-link'}
          >
            Borewell Connections
          </Link>
        </li>
        <li>
          <Link
            to="/crop-info"
            className={isActive('/crop-info') ? 'active menu-link' : 'menu-link'}
          >
            Crop Info
          </Link>
        </li>
        <li>
          <Link
            to="/motor-schedule"
            className={isActive('/motor-schedule') ? 'active menu-link' : 'menu-link'}
          >
            Motor Schedule
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className={isActive('/history') ? 'active menu-link' : 'menu-link'}
          >
            History
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
