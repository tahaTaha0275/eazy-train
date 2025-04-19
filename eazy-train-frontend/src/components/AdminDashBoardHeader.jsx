import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AdminDashboard.css';
import { LogOut } from 'lucide-react';

const AdminDashboardHeader = () => {
  const navigate = useNavigate();

  return (
      <header className="admin-header">
        <div className="logo-container">
          <img
            src="https://i.ibb.co/1tqBmXcM/image.png"
            alt="EazyTrain Logo"
            className="admin-logo"
          />
        </div>
        <h1 className="admin-title">Admin Dashboard</h1>
        <button 
          className="logout-button"
          onClick={() => navigate('/login')}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </header>
  );
};

export default AdminDashboardHeader;