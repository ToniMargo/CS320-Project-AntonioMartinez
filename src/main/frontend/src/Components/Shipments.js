import React, { useEffect, useState } from 'react';
import './Shipments.css';

function Shipments() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/shipments')
      .then(response => response.json())
      .then(data => setShipments(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Shipments</h1>
      <table>
        <thead>
        <tr>
          <th>Number</th>
          <th>Date</th>
          <th>Item</th>
          <th>Quantity</th>
        </tr>
        </thead>
        <tbody>
        {shipments.map(shipment => (
          <tr key={shipment.id}>
            <td>{shipment.id}</td>
            <td>{shipment.date}</td>
            <td>{shipment.item}</td>
            <td>{shipment.quantity}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shipments;
