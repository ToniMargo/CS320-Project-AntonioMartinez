import React, { useState } from 'react';
import './InventoryManage.css';

// Component for managing inventory items (create, update, delete)
function InventoryManage() {
  const [form, setForm] = useState({
    id: '',
    description: '',
    quantity: '',
    unit: ''
  });

  // Initialize form state with empty values for id, description, quantity, and unit
  // Handler for form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for creating a new inventory item (POST)
  const handleCreate = (e) => {
    e.preventDefault();
    // For creation, id is not needed. Require the other fields.
    if (!form.description || !form.quantity || !form.unit) {
      alert("Please fill in description, quantity, and unit to create an item.");
      return;
    }
    // Validate quantity to be a positive number
    const quantityNumber = Number(form.quantity);
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      alert("Quantity must be a positive number.");
      return;
    }
    // Send a POST request to create a new inventory item
    fetch('http://localhost:8080/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: form.description,
        quantity: quantityNumber,
        unit: form.unit
      })
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        alert("Inventory item created successfully!");
        setForm({ id: '', description: '', quantity: '', unit: '' });
      })
      .catch(err => alert("Error: " + err.message));
  };

  // Handler for updating an existing inventory item (PUT)
  const handleUpdate = (e) => {
    e.preventDefault();
    const id = form.id.trim();
    if (!id) {
      alert("Please provide an ID for update.");
      return;
    }
    if (!form.description || !form.quantity || !form.unit) {
      alert("Please fill in description, quantity, and unit for update.");
      return;
    }
    const updatedItem = {
      description: form.description,
      quantity: Number(form.quantity),
      unit: form.unit
    };
    fetch(`http://localhost:8080/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(data => {
        alert("Inventory updated successfully!");
        setForm({ id: '', description: '', quantity: '', unit: '' });
      })
      .catch(err => alert("Error: " + err.message));
  };

  // Handler for deleting an inventory item (DELETE)
  const handleDelete = (e) => {
    e.preventDefault();
    const id = form.id.trim();
    if (!id) {
      alert("Please provide an ID for deletion.");
      return;
    }
    fetch(`http://localhost:8080/inventory/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        alert("Inventory item deleted successfully!");
        setForm({ id: '', description: '', quantity: '', unit: '' });
      })
      .catch(err => alert("Error: " + err.message));
  };

  return (
    <div className="container">
      <h1>Manage Inventory</h1>
      <form className="inventory-form">
        <div className="form-group">
          <label htmlFor="id">Item ID (for update/delete):</label>
          <input
            type="text"
            id="id"
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="Leave blank for creation"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter item description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit:</label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            placeholder="Enter unit (e.g., pcs)"
          />
        </div>
        <div className="button-group">
          <button onClick={handleCreate} type="button">Create</button>
          <button onClick={handleUpdate} type="submit">Update</button>
          <button onClick={handleDelete} type="button">Delete</button>
        </div>
      </form>
    </div>
  );
}

export default InventoryManage;
