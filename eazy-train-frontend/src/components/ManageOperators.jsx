import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit2, Save, Trash2, UserPlus, AlertTriangle } from 'lucide-react';
import AdminDashboardHeader from '../components/AdminDashboardHeader';
import AdminDashboardFooter from '../components/AdminDashboardFooter';
import './styles/ManageOperators.css'; 

const ManageOperators = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [operators, setOperators] = useState([
    { id: 'OP01', name: 'Muhammad Alhosainy' },
    { id: 'OP02', name: 'Moutaz Jaber' },
    { id: 'OP03', name: 'Ahmed Adel' },
    { id: 'OP04', name: 'Abdullah AlQalalweh' },
    { id: 'OP05', name: 'Mohammed Rashad' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [operatorToDelete, setOperatorToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOperator, setNewOperator] = useState({ id: '', name: '' });

  const handleEditClick = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleSave = (id) => {
    if (editedName.trim() === '') return;
    setOperators(operators.map(op => op.id === id ? { ...op, name: editedName } : op));
    setEditingId(null);
    setEditedName('');
  };

  const confirmDelete = (operator) => {
    setOperatorToDelete(operator);
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    if (operatorToDelete) {
      setOperators(operators.filter(op => op.id !== operatorToDelete.id));
      setShowConfirmation(false);
      setOperatorToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setOperatorToDelete(null);
  };

  const handleAddOperator = () => {
    if (newOperator.id.trim() === '' || newOperator.name.trim() === '') return;
    
    // Check if ID already exists
    if (operators.some(op => op.id === newOperator.id)) {
      alert('Operator ID already exists!');
      return;
    }
    
    setOperators([...operators, { id: newOperator.id, name: newOperator.name }]);
    setNewOperator({ id: '', name: '' });
    setShowAddModal(false);
  };

  const filteredOperators = operators.filter(op => 
    op.id.toLowerCase().includes(search.toLowerCase()) || 
    op.name.toLowerCase().includes(search.toLowerCase())
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
              <div className="operator-id-header">ID</div>
              <div className="operator-name-header">Name</div>
              <div className="operator-actions-header">Actions</div>
            </div>
            
            {filteredOperators.length > 0 ? (
              filteredOperators.map(op => (
                <div key={op.id} className="operator-item">
                  <div className="operator-id">{op.id}</div>
                  <div className="operator-name">
                    {editingId === op.id ? (
                      <input
                        className="edit-input"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        autoFocus
                      />
                    ) : op.name}
                  </div>
                  <div className="operator-actions">
                    {editingId === op.id ? (
                      <button className="save-button" onClick={() => handleSave(op.id)} title="Save changes">
                        <Save size={18} />
                      </button>
                    ) : (
                      <button className="edit-button" onClick={() => handleEditClick(op.id, op.name)} title="Edit operator">
                        <Edit2 size={18} />
                      </button>
                    )}
                    <button className="delete-button" onClick={() => confirmDelete(op)} title="Delete operator">
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
                <label>Operator ID:</label>
                <input 
                  className="add-input"
                  value={newOperator.id}
                  onChange={(e) => setNewOperator({...newOperator, id: e.target.value})}
                  placeholder="Enter operator ID (e.g. OP06)"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Operator Name:</label>
                <input 
                  className="add-input"
                  value={newOperator.name}
                  onChange={(e) => setNewOperator({...newOperator, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
            </div>
            <div className="add-dialog-actions">
              <button 
                className="cancel-button" 
                onClick={() => {
                  setShowAddModal(false);
                  setNewOperator({ id: '', name: '' });
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

      <AdminDashboardFooter />

    </div>
  );
};

export default ManageOperators;