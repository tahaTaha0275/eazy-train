// Barcode.jsx
import React from 'react';
const barcodeImage = './src/barcode.png'; 
import './styles/Barcode.css';

const Barcode = () => {
  return (
    <div className="barcode-section">
      <div className="barcode-wrapper">
        <img
          src={barcodeImage}
          alt="Barcode"
          className="barcode-image"
        />
      </div>
      <div><p>Scan the barcode to view your ticket in any device</p></div>
      <div className="barcode-buttons">
        <button>Print E-Ticket (English)</button>
        <button>Print E-Ticket (Arabic)</button>
        <button>Book Another Ticket</button>
        <button>Download Ticket</button>
      </div>
    </div>
  );
};

export default Barcode;

