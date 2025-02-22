import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import About from './Components/About';
import Login from './Components/Login';
import Inventory from './Components/Inventory';
import Shipments from './Components/Shipments';
import NewShipment from './Components/NewShipment';
import InventoryManage from './Components/InventoryManage';
import reportWebVitals from './reportWebVitals';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/new-shipment" element={<NewShipment />} />
        <Route path="/inventory-manage" element={<InventoryManage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
