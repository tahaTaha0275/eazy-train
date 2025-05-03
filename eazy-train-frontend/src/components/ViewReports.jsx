// src/Pages/ViewReports.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardHeader from './AdminDashboardHeader';
import AdminDashboardFooter from './AdminDashboardFooter';
import './styles/ViewReports.css';

const ViewReports = () => {
  const navigate = useNavigate();

  const generateReport = () => {
    alert('Generating report... (coming soon)');
  };

  return (
    <>
    <AdminDashboardHeader />
    <div className="homepage-container">
      
      <nav style={{ width: '100%', padding: '1rem', backgroundColor: '#f8f8f8', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'center' }}>
        <button className="toggle-btn" onClick={() => navigate('/AdminDashboard')}>Dashboard</button>
      </nav>
      <main className="home-main">
        <div className="logo-container">
          <img
            src="https://i.ibb.co/1tqBmXcM/image.png"
            alt="EazyTrain Logo"
            style={{ maxWidth: '300px' }}
          />
        </div>
        <h2>System Reports</h2>
        <p>This page will display train usage reports, booking stats, and customer feedback insights to help improve operations.</p>
        <button className="search-button" onClick={generateReport} style={{ marginTop: '2rem' }}>
          Generate Report
        </button>
      </main>
      <AdminDashboardFooter />
    </div>
    </>
  );
};

export default ViewReports;