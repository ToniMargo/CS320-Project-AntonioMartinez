import React from 'react';
import './NewShipment.css';

function NewShipment() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, simply log the form data or handle submission as needed.
    console.log('Form submitted');
  };

  return (
    <div className="container">
      <h1>New Shipment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="shipmentName">Shipment Name:</label>
          <input type="text" id="shipmentName" name="shipmentName" />
        </div>
        <div className="form-group">
          <label htmlFor="shipmentDate">Shipment Date:</label>
          <input type="date" id="shipmentDate" name="shipmentDate" />
        </div>
        <div className="form-group">
          <label htmlFor="details">Details:</label>
          <textarea id="details" name="details"></textarea>
        </div>
        <button type="submit">Create Shipment</button>
      </form>
    </div>
  );
}

export default NewShipment;
