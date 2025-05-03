import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Users, UserX, BarChart2, LogOut } from 'lucide-react';
import './styles/AdminDashboard.css';
import AdminDashboardHeader from './AdminDashboardHeader';
import AdminDashboardFooter from './AdminDashboardFooter';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
    <AdminDashboardHeader />

      <main className="admin-main">
        <div className="admin-card">
          <h2 className="admin-card-title">Management Console</h2>
          <p className="admin-card-subtitle">Select an option to manage your system</p>
          
          <div className="admin-actions">
            <button 
              className="admin-action-button create"
              onClick={() => navigate('/AdminDashboard/add-trip')}
            >
              <div className="action-icon">
                <PlusCircle size={24} />
              </div>
              <div className="action-content">
                <span className="action-title">Create New Trip</span>
                <span className="action-description">Add new routes and schedules</span>
              </div>
            </button>

            <button 
              className="admin-action-button delete"
              onClick={() => navigate('/AdminDashboard/delete-trip')}
            >
              <div className="action-icon">
                <Trash2 size={24} />
              </div>
              <div className="action-content">
                <span className="action-title">Delete Trip</span>
                <span className="action-description">Remove existing routes</span>
              </div>
            </button>

            <button 
              className="admin-action-button manage"
              onClick={() => navigate('/AdminDashboard/manage-operators')}
            >
              <div className="action-icon">
                <Users size={24} />
              </div>
              <div className="action-content">
                <span className="action-title">Manage Operators</span>
                <span className="action-description">Edit operator access and details</span>
              </div>
            </button>

            <button 
              className="admin-action-button users"
              onClick={() => navigate('/AdminDashboard/delete-users')}
            >
              <div className="action-icon">
                <UserX size={24} />
              </div>
              <div className="action-content">
                <span className="action-title">Delete Users</span>
                <span className="action-description">Manage user accounts</span>
              </div>
            </button>

            <button 
              className="admin-action-button reports"
              onClick={() => navigate('/AdminDashboard/view-reports')}
            >
              <div className="action-icon">
                <BarChart2 size={24} />
              </div>
              <div className="action-content">
                <span className="action-title">View Reports</span>
                <span className="action-description">Analytics and statistics</span>
              </div>
            </button>
          </div>
        </div>
      </main>

      <AdminDashboardFooter />
    </div>
  );
};

export default AdminDashboard;