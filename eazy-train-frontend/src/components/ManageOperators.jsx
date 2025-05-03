import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit2, Save, Trash2, UserPlus, AlertTriangle } from 'lucide-react';
import AdminDashboardHeader from '../components/AdminDashboardHeader';
import AdminDashboardFooter from '../components/AdminDashboardFooter';
import './styles/ManageOperators.css';

const ManageOperators = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [operators, setOperators] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [operatorToDelete, setOperatorToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOperator, setNewOperator] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    nationalID: '',
    nationality: '',
    phone: ''
  });

  const [selectedOperator, setSelectedOperator] = useState(null); // for view
  const [viewOnly, setViewOnly] = useState(true);
  const [editedOperator, setEditedOperator] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const fetchOperators = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/operators`);
      const data = await response.json();
      console.log('Fetched operators:', data);
      setOperators(data);
    } catch (err) {
      console.error('Failed to load operators:', err);
    }
  };
  useEffect(() => {
    

    fetchOperators();
  }, []);

  const handleViewClick = (operator) => {
    setSelectedOperator(operator);
    setViewOnly(true);
    setShowDetailsModal(true);
  };
  
  const handleEditClick = (operator) => {
    // Set the editedOperator with the selected operator data
    setEditedOperator({ ...operator });
    setSelectedOperator(operator); // Make sure to set selectedOperator too
    setViewOnly(false); // Switch to edit mode
    setShowDetailsModal(true);
  };
  
  const handleSave = async () => {
    if (!editedOperator.name || !editedOperator.email) {
      alert('Name and email are required.');
      return;
    }
  
    try {
      const updatedData = { ...editedOperator };
      if (!updatedData.password) delete updatedData.password;
  
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/operators/${editedOperator.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
  
      if (response.ok) {
        const updated = await response.json();
        setOperators(operators.map(op => op.id === updated.id ? updated : op));
        setShowDetailsModal(false);
        setEditedOperator(null);
        setSelectedOperator(null);
        console.log('Operator updated successfully:', updated);
        // refetch operators to ensure the list is up-to-date. call fetchOperators() 
        fetchOperators();
      } else {
        const err = await response.json();
        alert('Update failed: ' + (err.message || 'Unknown error'));
        console.error('Update error response:', err);
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Server error while saving');
    }
  };
  
  const confirmDelete = (operator) => {
    setOperatorToDelete(operator);
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    if (operatorToDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URI}/operators/${operatorToDelete.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setOperators(operators.filter(op => op.id !== operatorToDelete.id));
          setShowConfirmation(false);
          setOperatorToDelete(null);
        } else {
          const error = await response.json();
          alert('Failed to delete operator: ' + (error.message || 'Unknown error'));
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert('Server error while deleting');
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setOperatorToDelete(null);
  };

  const handleAddOperator = async () => {
    const operator = {
      ...newOperator,
      age: Number(newOperator.age) || 0,
      role: 'operator'
    };
  
    // Basic validation
    if (!operator.name || !operator.email || !operator.password) {
      alert('Name, email, and password are required.');
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/operators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(operator)
      });
  
      if (response.ok) {
        const saved = await response.json();
        setOperators([...operators, saved]);
        setNewOperator({
          name: '', email: '', password: '', age: '', gender: '',
          nationalID: '', nationality: '', phone: ''
        });
        setShowAddModal(false);
      } else {
        const error = await response.json();
        alert('Failed to add operator: ' + (error.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error adding operator:', err);
      alert('Server error');
    }
  };  

  const filteredOperators = operators.filter(op =>
    (op.id?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (op.name?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div className="manage-operators-page">
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
          <h2 className="page-title">Manage Operators</h2>
        </div>

        <div className="operators-container">
          <div className="operators-controls">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                className="search-input"
                placeholder="Search by ID or name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="add-button" onClick={() => setShowAddModal(true)}>
              <UserPlus size={18} />
              Add Operator
            </button>
          </div>

          <div className="operators-list">
            <div className="list-header">
              <div className="operator-name-header">Name</div>
              <div className="operator-actions-header">Actions</div>
            </div>

            {filteredOperators.length > 0 ? (
              filteredOperators.map(op => (
                <div key={op.id} className="operator-item">
                  
                  <div className="operator-name">
                    {editingId === op.id ? (
                      <input
                        className="edit-input"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        autoFocus
                      />
                    ) : op.name || op.email}
                  </div>
                  <div className="operator-actions">
                    <button
                      className="view-button"
                      onClick={() => handleViewClick(op)}
                      title="View details"
                    >
                      View
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(op)}
                      title="Edit operator"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => confirmDelete(op)}
                      title="Delete operator"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No operators found matching your search criteria.</p>
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
            <p>Are you sure you want to delete this operator?</p>
            <div className="operator-details">
              <p><strong>ID:</strong> {operatorToDelete.id}</p>
              <p><strong>Name:</strong> {operatorToDelete.name}</p>
            </div>
            <p className="warning-text">This action cannot be undone!</p>
            <div className="confirmation-actions">
              <button className="cancel-button" onClick={cancelDelete}>Cancel</button>
              <button className="confirm-button" onClick={handleDelete}>Delete Operator</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Operator Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="add-dialog">
            <h3 className="add-dialog-title">Add New Operator</h3>
            <div className="add-form">
              <div className="form-group">
                <label>Email:</label>
                <input
                  className="add-input"
                  value={newOperator.email}
                  onChange={(e) => setNewOperator({ ...newOperator, email: e.target.value })}
                  placeholder="e.g. operator@example.com"
                />
              </div>

              <div className="form-group">
                <label>Name:</label>
                <input
                  className="add-input"
                  value={newOperator.name}
                  onChange={(e) => setNewOperator({ ...newOperator, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="add-input"
                  value={newOperator.password}
                  onChange={(e) => setNewOperator({ ...newOperator, password: e.target.value })}
                  placeholder="Temporary password"
                />
              </div>

              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  className="add-input"
                  value={newOperator.age}
                  onChange={(e) => setNewOperator({ ...newOperator, age: e.target.value })}
                  placeholder="e.g. 30"
                />
              </div>

              <div className="form-group">
                <label>Gender:</label>
                <select
                  className="add-input"
                  value={newOperator.gender}
                  onChange={(e) => setNewOperator({ ...newOperator, gender: e.target.value })}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>National ID:</label>
                <input
                  className="add-input"
                  value={newOperator.nationalID}
                  onChange={(e) => setNewOperator({ ...newOperator, nationalID: e.target.value })}
                  placeholder="e.g. 1234567890"
                />
              </div>

              <div className="form-group">
                <label>Nationality:</label>
                <input
                  className="add-input"
                  value={newOperator.nationality}
                  onChange={(e) => setNewOperator({ ...newOperator, nationality: e.target.value })}
                  placeholder="e.g. Saudi"
                />
              </div>

              <div className="form-group">
                <label>Phone:</label>
                <input
                  className="add-input"
                  value={newOperator.phone}
                  onChange={(e) => setNewOperator({ ...newOperator, phone: e.target.value })}
                  placeholder="e.g. +966500000000"
                />
              </div>
            </div>
            <div className="add-dialog-actions">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowAddModal(false);
                  setNewOperator({ 
                    name: '', 
                    email: '', 
                    password: '',
                    age: '',
                    gender: '',
                    nationalID: '',
                    nationality: '',
                    phone: ''
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="confirm-button"
                onClick={handleAddOperator}
              >
                Add Operator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details/Edit Modal */}
      {showDetailsModal && (
        <div className="modal-overlay">
          <div className="add-dialog">
            <h3 className="add-dialog-title">
              {viewOnly ? 'Operator Details' : 'Edit Operator'}
            </h3>

            <div className="add-form">
              {[
                ['name', 'Full Name'],
                ['email', 'Email'],
                ['age', 'Age'],
                ['gender', 'Gender'],
                ['nationalID', 'National ID'],
                ['nationality', 'Nationality'],
                ['phone', 'Phone'],
                ['role', 'Role']
              ].map(([field, label]) => (
                <div className="form-group" key={field}>
                  <label>{label}:</label>

                  {viewOnly ? (
                    <p>
                      {field.includes('At') && selectedOperator?.[field]
                        ? new Date(selectedOperator[field]).toLocaleString()
                        : selectedOperator?.[field] || '-'}
                    </p>
                  ) : (
                    field === 'gender' ? (
                      <select
                        className="add-input"
                        value={editedOperator?.[field] || ''}
                        onChange={(e) =>
                          setEditedOperator({ ...editedOperator, [field]: e.target.value })
                        }
                        disabled={field === 'role' || field.includes('At')}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      <input
                        className="add-input"
                        type={field === 'age' ? 'number' : 'text'}
                        value={editedOperator?.[field] || ''}
                        onChange={(e) =>
                          setEditedOperator({ ...editedOperator, [field]: e.target.value })
                        }
                        placeholder={`Enter ${label.toLowerCase()}`}
                        disabled={field === 'role' || field.includes('At')}
                      />
                    )
                  )}
                </div>
              ))}
            </div>

            <div className="add-dialog-actions">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowDetailsModal(false);
                  setEditedOperator(null);
                  setSelectedOperator(null);
                }}
              >
                {viewOnly ? 'Close' : 'Cancel'}
              </button>

              {viewOnly ? (
                <button
                  className="edit-button"
                  onClick={() => {
                    setViewOnly(false);
                    setEditedOperator({...selectedOperator});
                  }}
                >
                  Edit Operator
                </button>
              ) : (
                <button className="confirm-button" onClick={handleSave}>
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <AdminDashboardFooter />
    </div>
  );
};

export default ManageOperators;