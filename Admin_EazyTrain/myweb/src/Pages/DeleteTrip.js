// src/Pages/DeleteTrip.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/DeleteTrip.css';


const DeleteTrip = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [trips, setTrips] = useState([
    { id: 'TR1001', from: 'Riyadh', to: 'Dammam' },
    { id: 'TR1002', from: 'Makkah', to: 'Medina' },
    { id: 'TR1003', from: 'Jeddah', to: 'Medina' },
    { id: 'TR1004', from: 'Makkah', to: 'Jeddah' },
    { id: 'TR1005', from: 'Rabegh', to: 'Medina' }

  ]);

  const handleDelete = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  return (
    <div className="homepage-container">
      <nav style={{ width: '100%', padding: '1rem', backgroundColor: '#f8f8f8', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'center' }}>
        <button className="toggle-btn" onClick={() => navigate('/admin')}>Dashboard</button>
      </nav>
      <main className="home-main">
        <div className="logo-container">
          <img
            src="https://i.ibb.co/1tqBmXcM/image.png"
            alt="EazyTrain Logo"
            style={{ maxWidth: '300px' }}
          />
        </div>
        <h2>Delete Trip</h2>
        <input className="formHome-input" placeholder="Search by Trip ID" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="search-form">
          {trips.filter(t => t.id.includes(search)).map(trip => (
            <div key={trip.id} className="form-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{trip.id} | {trip.from} → {trip.to}</span>
              <button className="search-button" onClick={() => handleDelete(trip.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DeleteTrip;