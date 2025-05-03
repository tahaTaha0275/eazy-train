import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Train, MapPin, Calendar, DollarSign, Hash } from 'lucide-react';
import AdminDashboardHeader from './AdminDashboardHeader';
import AdminDashboardFooter from './AdminDashboardFooter';
import './styles/AdminAddTrip.css';



const AdminAddTrip = () => {
  const [operators, setOperators] = useState([]);

  // Placeholder: you'll implement this later
  const fetchOperators = async () => {
    try {
      const response = await fetch('http://localhost:8080/operators');
      const data = await response.json();
      setOperators(data);
    } catch (err) {
      console.error('Failed to fetch operators:', err);
    }
  };
  

  React.useEffect(() => {
  fetchOperators();
  }, []);

  const [form, setForm] = useState({
    train: '',
    from: '',
    to: '',
    departureDateTime: '',
    arrivalDateTime: '',
    ticketPrice: '',
    tripNumber: '',
    operatorId: '' // <-- NEW
  });
  

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trip Created:', form);
    alert('Trip created successfully!');
  };
  
  return (
    <div className="admin-page">
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
          <h2 className="page-title">Create New Trip</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="trip-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Train size={18} className="form-icon" />
                  Train
                </label>
                <input 
                  className="form-input" 
                  name="train" 
                  value={form.train} 
                  onChange={handleChange} 
                  placeholder="Enter train name or number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={18} className="form-icon" />
                  Departure Date
                </label>
                <input 
                  className="form-input" 
                  type="datetime-local" 
                  name="departureDateTime" 
                  value={form.departureDateTime} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={18} className="form-icon" />
                  Arrival Date
                </label>
                <input 
                  className="form-input" 
                  type="datetime-local" 
                  name="arivalDateTime" 
                  value={form.arrivalDateTime} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={18} className="form-icon" />
                  From
                </label>
                <input 
                  className="form-input" 
                  name="from" 
                  value={form.from} 
                  onChange={handleChange}
                  placeholder="Departure station"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <DollarSign size={18} className="form-icon" />
                  Ticket Price
                </label>
                <input
                  className="form-input"
                  type="number"               
                  name="ticketPrice"
                  value={form.ticketPrice}
                  onChange={handleChange}
                  step="0.01"                  
                  min="0"
                  pattern="\\d*(\\.\\d{0,2})?"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={18} className="form-icon" />
                  To
                </label>
                <input 
                  className="form-input" 
                  name="to" 
                  value={form.to} 
                  onChange={handleChange}
                  placeholder="Arrival station"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <Hash size={18} className="form-icon" />
                  Trip Number
                </label>
                <input 
                  className="form-input" 
                  name="tripNumber" 
                  value={form.tripNumber} 
                  onChange={handleChange}
                  placeholder="Unique trip identifier"
                  required
                />
              </div>
            </div>
            <div className="form-row">
            <div className="form-group">
  <label className="form-label">
    👤 Operator
  </label>
  <select
    className="form-input"
    name="operatorId"
    value={form.operatorId}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Select an operator</option>
    {operators.map(op => (
      <option key={op.id} value={op.id}>{op.name}</option>
    ))}
  </select>
</div>
</div>

            <div className="form-actions">
              <button
                className="form-button create-button"
                type="submit"
              >
                Create Trip
              </button>
              <button
                className="form-button cancel-button"
                type="button"
                onClick={() => navigate('/AdminDashboard')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <AdminDashboardFooter />

      <style jsx>{`
        /* Main container */
        .admin-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f7f9fc;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Navigation */
        .admin-navigation {
          background-color: #f0f2f5;
          padding: 12px 24px;
          border-bottom: 1px solid #e0e4e8;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .dashboard-button {
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dashboard-button:hover {
          background-color: #357abd;
        }

        /* Main content */
        .admin-content {
          flex: 1;
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Page header */
        .page-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
          text-align: center;
        }

        .page-logo {
          max-width: 240px;
          margin-bottom: 16px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        /* Form container */
        .form-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 32px;
          width: 100%;
          max-width: 880px;
        }

        /* Form */
        .trip-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-weight: 500;
          color: #4a5568;
          font-size: 14px;
        }

        .form-icon {
          margin-right: 8px;
        }

        .form-input {
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
          background-color: #f9fafb;
        }

        .form-input:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
          background-color: white;
        }

        .form-input::placeholder {
          color: #a0aec0;
        }

        /* Form actions */
        .form-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 16px;
        }

        .form-button {
          padding: 12px 28px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 160px;
        }

        .create-button {
          background-color: #4c51bf;
          color: white;
        }

        .create-button:hover {
          background-color: #434190;
          transform: translateY(-1px);
        }

        .cancel-button {
          background-color: #e2e8f0;
          color: #4a5568;
        }

        .cancel-button:hover {
          background-color: #cbd5e0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .form-container {
            padding: 24px 16px;
          }
          
          .form-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .form-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminAddTrip;