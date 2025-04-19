// src/components/AdminAddTrip.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AdminAddTrip.css';


const AdminAddTrip = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    train: '',
    from: '',
    to: '',
    date: '',
    ticketPrice: '',
    tripNumber: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trip Created:', form);
    alert('Trip created successfully!');
  };

  return (
    <div className="homepage-container">
      <nav style={{ width: '100%', padding: '1rem', background: '#f8f8f8', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'center' }}>
        <button className="toggle-btn" onClick={() => navigate('/AdminDashboard')}>Dashboard</button>
      </nav>

      <main className="home-main" style={{ width: '100%' }}>
        <img
            src="https://i.ibb.co/1tqBmXcM/image.png"
            alt="EazyTrain Logo"
            style={{ maxWidth: '300px' }}
          />
        <h2 style={{ alignSelf: 'centre', fontWeight: 700, marginBottom: '1rem' }}>Create Trip</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            background: '#dadada',
            padding: '2rem',
            borderRadius: '2px',
            maxWidth: '880px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Train</label>
            <input className="formHome-input" name="train" value={form.train} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>date</label>
            <input className="formHome-input" type="date" name="date" value={form.date} onChange={handleChange} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>From</label>
            <input className="formHome-input" name="from" value={form.from} onChange={handleChange} />
          </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Ticket Price</label>
                <input
                    className="formHome-input"
                    type="number"               
                    name="ticketPrice"
                    value={form.ticketPrice}
                    onChange={handleChange}
                    step="0.01"                  
                    min="0"
                    pattern="\\d*(\\.\\d{0,2})?"  
                />
            </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>to</label>
            <input className="formHome-input" name="to" value={form.to} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Trip Number</label>
            <input className="formHome-input" name="tripNumber" value={form.tripNumber} onChange={handleChange} />
          </div>
        </form>

        <div
            style={{
            display: 'flex',
            justifyContent: 'center', 
            marginTop: '2rem'
            }}
        >
        <button
            className="search-button"
            type="submit"
            onClick={handleSubmit}
            style={{ width: '320px', background: 'gray' }}
            >
            Create
            </button>
        </div>
      </main>

      <div style={{ width: '100%', height: '120px', background: 'gray', marginTop: '2rem' }} />
    </div>
  );
};

export default AdminAddTrip;