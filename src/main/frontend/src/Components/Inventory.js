import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css';

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/inventory')
      .then(response => response.json())
      .then(data => setInventory(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Inventory</h1>
      <table>
        <thead>
        <tr>
          <th>Code</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Unit</th>
        </tr>
        </thead>
        <tbody>
        {inventory.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>{item.unit}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="manage-link">
        <Link to="/inventory-manage">Manage Inventory</Link>
      </div>
    </div>
  );
}

export default Inventory;
