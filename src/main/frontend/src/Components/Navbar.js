import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/Images/logo.png" alt="logo" className="navbar-logo" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/shipments">Shipments</Link></li>
        <li><Link to="/new-shipment">New Shipment</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
