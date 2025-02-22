import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>INVIA</h1>
      <img src="/Images/landscape.jpg" alt="Landscape" className="app-image"/>
      <p>
        Welcome to INVIA, your simple solution for managing shipments and inventory.
        Easily track shipments, manage your stock levels, and stay organized.
      </p>
      <div className="links">
        <Link to="/inventory">Inventory</Link>
        <Link to="/shipments">Shipments</Link>
        <Link to="/new-shipment">New Shipment</Link>
      </div>
    </div>
  );
}

export default App;
