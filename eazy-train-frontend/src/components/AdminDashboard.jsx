// src/Pages/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <main className="home-main dashboard-page">
        <div className="logo-container">
            <img
            src="https://i.ibb.co/1tqBmXcM/image.png"
            alt="EazyTrain Logo"
            style={{ maxWidth: '300px' }}
          />
          <h2 style={{ marginBottom: '1rem' }}>Admin Dashboard</h2>
        </div>

        <form style={{ background: '#ddd', padding: '2rem', borderRadius: '2px', maxWidth: '800px', width: '100%' }}>
          <div className="search-form">
            <div className="form-row">
              <button className="search-button" type="button" onClick={() => navigate('/AdminDashboard/add-trip')}>
                ➕ Create New Trip
              </button>
            </div>
            <div className="form-row">
              <button className="search-button" type="button" onClick={() => navigate('/AdminDashboard/delete-trip')}>
                🗑 Delete Trip
              </button>
            </div>
            <div className="form-row">
              <button className="search-button" type="button" onClick={() => navigate('/AdminDashboard/manage-operators')}>
                👤 Manage Operators
              </button>
            </div>
            <div className="form-row">
              <button className="search-button" type="button" onClick={() => navigate('/AdminDashboard/delete-users')}>
                🚫 Delete Users
              </button>
            </div>
            <div className="form-row">
              <button className="search-button" type="button" onClick={() => navigate('/AdminDashboard/view-reports')}>
                📊 View Reports
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminDashboard;