// src/Pages/ManageOperators.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ManageOperators.css';

const ManageOperators = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [operators, setOperators] = useState([
    { id: 'OP01', name: 'Muhammad Alhosainy' },
    { id: 'OP02', name: 'Moutaz Jaber' },
    { id: 'OP03', name: 'Ahmed Adel' },
    { id: 'OP04', name: 'Abdullah AlQalalweh' },
    { id: 'OP05', name: '- Mohammed Rashad' }

    
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleEditClick = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleSave = (id) => {
    setOperators(operators.map(op => op.id === id ? { ...op, name: editedName } : op));
    setEditingId(null);
    setEditedName('');
  };

  const handleDelete = (id) => {
    setOperators(operators.filter(op => op.id !== id));
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
        <h2>Manage Operators</h2>
        <input className="formHome-input" placeholder="Search by Operator ID" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="search-form">
          {operators.filter(op => op.id.includes(search)).map(op => (
            <div key={op.id} className="form-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{op.id} | {editingId === op.id ? (
                <input
                  className="formHome-input"
                  style={{ marginBottom: 0 }}
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                op.name
              )}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {editingId === op.id ? (
                  <button className="search-button" onClick={() => handleSave(op.id)}>Save</button>
                ) : (
                  <button className="search-button" onClick={() => handleEditClick(op.id, op.name)}>Edit</button>
                )}
                <button className="search-button" onClick={() => handleDelete(op.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageOperators;