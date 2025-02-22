import React, { useEffect, useState } from 'react';
import './NewShipment.css';

// This component allows users to create a new shipment by selecting a product from the inventory
function NewShipment() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    date: '',
    item: '',
    quantity: ''
  });

  // Initialize the form with today's date
  useEffect(() => {
    // Fetch available products from inventory
    fetch('http://localhost:8080/inventory')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, item: data[0].description }));
        }
      })
      .catch(err => console.error(err));
  }, []);

  // Set the shipment date to today
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the shipment date: must be today or later
    const today = new Date().toISOString().split("T")[0];
    if (form.date < today) {
      alert("Shipment date cannot be in the past.");
      return;
    }

    // Find the selected product from inventory
    const selectedProduct = products.find(p => p.description === form.item);
    if (!selectedProduct) {
      alert("Selected product not found.");
      return;
    }

    // Validate quantity: must be a positive number and not exceed available inventory
    const quantityNumber = Number(form.quantity);
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      alert("Quantity must be a positive number.");
      return;
    }
    if (quantityNumber > selectedProduct.quantity) {
      alert("Quantity exceeds available inventory.");
      return;
    }

    // Submit the shipment to the backend
    fetch('http://localhost:8080/shipments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: form.date,
        item: form.item,
        quantity: quantityNumber
      })
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.text();
      })
      .then(message => {
        alert(message);
        // Optionally reset the form here
      })
      .catch(err => alert("Error: " + err.message));
  };

  return (
    <div className="container">
      <h1>New Shipment</h1>
      <form onSubmit={handleSubmit} className="new-shipment-form">
        <div className="form-group">
          <label htmlFor="date">Shipment Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="item">Product:</label>
          <select
            id="item"
            name="item"
            value={form.item}
            onChange={handleChange}
          >
            {products.map(product => (
              <option key={product.id} value={product.description}>
                {product.description}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Shipment</button>
      </form>
    </div>
  );
}

export default NewShipment;
