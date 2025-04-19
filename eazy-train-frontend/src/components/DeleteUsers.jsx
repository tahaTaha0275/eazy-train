import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, AlertTriangle } from 'lucide-react';
import AdminDashboardHeader from '../components/AdminDashboardHeader';
import AdminDashboardFooter from '../components/AdminDashboardFooter';
import './styles/DeleteUsers.css';

const DeleteUsers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { id: 'USR01', name: 'Muhammad Alhosainy' },
    { id: 'USR02', name: 'Moutaz Jaber' },
    { id: 'USR03', name: 'Ahmed Adel' },
    { id: 'USR04', name: 'Abdullah AlQalalweh' },
    { id: 'USR05', name: 'Mohammed Rashad' }
  ]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setShowConfirmation(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(user => 
    user.id.toLowerCase().includes(search.toLowerCase()) || 
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="delete-users-page">
      <AdminDashboardHeader />
      
      <nav className="admin-navigation">
        <button className="dashboard-button" onClick={() => navigate('/AdminDashboard')}>
          Back to Dashboard
        </button>
      </nav>

      <main className="admin-content">
        <div className="page-header">
          <img
            src="https://i.ibb.co/1tqBmXcM/image.png"
            alt="EazyTrain Logo"
            className="page-logo"
          />
          <h2 className="page-title">Delete Users</h2>
        </div>

        <div className="users-container">
          <div className="users-controls">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input 
                className="search-input" 
                placeholder="Search by ID or name" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
            </div>
          </div>

          <div className="users-list">
            <div className="list-header">
              <div className="user-id-header">ID</div>
              <div className="user-name-header">Name</div>
              <div className="user-actions-header">Actions</div>
            </div>
            
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div key={user.id} className="user-item">
                  <div className="user-id">{user.id}</div>
                  <div className="user-name">{user.name}</div>
                  <div className="user-actions">
                    <button className="delete-button" onClick={() => confirmDelete(user)} title="Delete user">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No users found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-dialog">
            <div className="confirmation-header">
              <AlertTriangle size={24} className="warning-icon" />
              <h3>Confirm Deletion</h3>
            </div>
            <p>Are you sure you want to delete this user?</p>
            <div className="user-details">
              <p><strong>ID:</strong> {userToDelete.id}</p>
              <p><strong>Name:</strong> {userToDelete.name}</p>
            </div>
            <p className="warning-text">This action cannot be undone!</p>
            <div className="confirmation-actions">
              <button className="cancel-button" onClick={cancelDelete}>Cancel</button>
              <button className="confirm-button" onClick={handleDelete}>Delete User</button>
            </div>
          </div>
        </div>
      )}

      <AdminDashboardFooter />
    </div>
  );
};

export default DeleteUsers;