// src/Pages/DeleteUsers.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/DeleteUsers.css';

const DeleteUsers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { id: 'USR01', name: 'Muhammad Alhosainy' },
    { id: 'USR02', name: 'Moutaz Jaber' },
    { id: 'USR03', name: 'Ahmed Adel' },
    { id: 'USR04', name: 'Abdullah AlQalalweh' },
    { id: 'USR05', name: '- Mohammed Rashad' }

  ]);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
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
        <h2>Delete Users</h2>
        <input className="formHome-input" placeholder="Search by User ID" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="search-form">
          {users.filter(u => u.id.includes(search)).map(user => (
            <div key={user.id} className="form-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{user.id} | {user.name}</span>
              <button className="search-button" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DeleteUsers;