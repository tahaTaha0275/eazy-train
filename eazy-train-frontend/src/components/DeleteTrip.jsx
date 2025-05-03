import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, ArrowRight, AlertTriangle } from 'lucide-react';
import AdminDashboardHeader from '../components/AdminDashboardHeader';
import AdminDashboardFooter from '../components/AdminDashboardFooter';
import './styles/DeleteTrip.css';

const DeleteTrip = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [trips, setTrips] = useState([]);

  // Fetch trips from the backend API
  const fetchTrips = async () => {
    try {
      const response = await fetch('http://localhost:8080/trips'); // Your backend API endpoint
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchTrips(); // Fetch trips on component mount
  }, []);

  const confirmDelete = (trip) => {
    setTripToDelete(trip);
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    if (tripToDelete) {
      try {
        await fetch(`http://localhost:8080/trips/${tripToDelete.id}`, {
          method: 'DELETE',
        });
        setTrips(trips.filter(trip => trip.id !== tripToDelete.id));
        setShowConfirmation(false);
        setTripToDelete(null);
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setTripToDelete(null);
  };

  const filteredTrips = trips.filter(t =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.from.toLowerCase().includes(search.toLowerCase()) ||
    t.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="delete-trip-page">
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
          <h2 className="page-title">Delete Trip</h2>
        </div>

        <div className="delete-trip-container">
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                className="search-input"
                placeholder="Search by Trip ID, From, or To"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="trips-list">
            {filteredTrips.length > 0 ? (
              filteredTrips.map(trip => (
                <div key={trip.id} className="trip-item">
                  <div className="trip-info">
                    <div className="trip-id">{trip.id}</div> {/* Display trip ID */}
                    <div className="trip-route">
                      <span className="trip-from">{trip.from}</span> {/* Display departure station */}
                      <ArrowRight size={16} className="route-arrow" />
                      <span className="trip-to">{trip.to}</span> {/* Display arrival station */}
                    </div>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => confirmDelete(trip)}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No trips found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <div className="confirmation-header">
              <AlertTriangle size={24} className="warning-icon" />
              <h3>Confirm Deletion</h3>
            </div>
            <p>Are you sure you want to delete this trip?</p>
            <div className="trip-details">
              <p><strong>Trip ID:</strong> {tripToDelete.id}</p> {/* Show Trip ID */}
              <p><strong>Route:</strong> {tripToDelete.from} to {tripToDelete.to}</p>
              </div>
            <p className="warning-text">This action cannot be undone!</p>
            <div className="confirmation-actions">
              <button className="cancel-button" onClick={cancelDelete}>Cancel</button>
              <button className="confirm-button" onClick={handleDelete}>Delete Trip</button>
            </div>
          </div>
        </div>
      )}

      <AdminDashboardFooter />
    </div>
  );
};

export default DeleteTrip;
