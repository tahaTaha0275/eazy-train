// Barcode.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles/Barcode.css';

const Barcode = () => {
  const navigate = useNavigate();
  return (
    <div className="barcode-section">
      <div className="barcode-wrapper">
        <img
          src="/barcode.png"
          alt="Barcode"
          className="barcode-image"
        />
      </div>
      <div><p>Scan the barcode to view your ticket in any device</p></div>
      <div className="barcode-buttons">
        <button>Print E-Ticket (English)</button>
        <button>Print E-Ticket (Arabic)</button>
        <button  onClick={() => navigate('/tickets')}>Book Another Ticket</button>
        <button>Download Ticket</button>
      </div>
    </div>
  );
};

export default Barcode;

