import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, ArrowRight, MapPin, Calendar, X } from 'lucide-react';
import AdminDashboardHeader from '../components/AdminDashboardHeader';
import AdminDashboardFooter from '../components/AdminDashboardFooter';
import './styles/EditTrip.css';

const EditTrip = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [tripToEdit, setTripToEdit] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedTrip, setUpdatedTrip] = useState({
    depStation: '',
    arriveStation: '',
    departureDate: '',
  });

  // Fetch trips from the backend API
  const fetchTrips = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/trips`); // Your backend API endpoint
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips(); // Fetch trips on component mount
  }, []);

  const confirmEdit = (trip) => {
    setTripToEdit(trip);
    // Format date properly for datetime-local input
    const formattedDate = trip.departureDate ? formatDateForInput(trip.departureDate) : '';
    
    setUpdatedTrip({
      depStation: trip.depStation || '',
      arriveStation: trip.arriveStation || '',
      departureDate: formattedDate,
    });
    setShowEditForm(true);
  };

  // Format date for datetime-local input (YYYY-MM-DDThh:mm)
  const formatDateForInput = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) return '';
      
      return date.toISOString().slice(0, 16);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const handleUpdate = async () => {
    if (tripToEdit) {
      try {
        await fetch(`${import.meta.env.VITE_BASE_URI}/trips/${tripToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTrip),
        });

        setTrips(
          trips.map((trip) =>
            trip.id === tripToEdit.id ? { ...trip, ...updatedTrip } : trip
          )
        );
        setShowEditForm(false);
        setTripToEdit(null);
        
        // Show success message or notification here
      } catch (error) {
        console.error('Error updating trip:', error);
        // Show error message or notification here
      }
    }
  };

  const cancelEdit = () => {
    setShowEditForm(false);
    setTripToEdit(null);
  };

  const filteredTrips = trips.filter(
    (t) =>
      t.id?.toLowerCase().includes(search.toLowerCase()) ||
      t.from?.toLowerCase().includes(search.toLowerCase()) ||
      t.to?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="edit-trip-page">
      <AdminDashboardHeader />

      <nav className="admin-navigation">
        <button
          className="dashboard-button"
          onClick={() => navigate('/AdminDashboard')}
        >
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
          <h2 className="page-title">Edit Trip</h2>
        </div>

        <div className="edit-trip-container">
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
            {loading ? (
              <div className="loading-state">Loading trips...</div>
            ) : filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => (
                <div key={trip.id} className="trip-item">
                  <div className="trip-info">
                    <div className="trip-id">{trip.id}</div>
                    <div className="trip-route">
                      <span className="trip-from">{trip.from}</span>
                      <ArrowRight size={16} className="route-arrow" />
                      <span className="trip-to">{trip.to}</span>
                    </div>
                  </div>
                  <button
                    className="trip-edit-button"
                    onClick={() => confirmEdit(trip)}
                  >
                    <Edit size={18} />
                    Edit
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

      {showEditForm && (
        <div className="edit-form-overlay">
          <div className="edit-form-dialog">
            <h3>Edit Trip Details</h3>

            <div className="edit-form">
              <div className="form-field-group">
                <label htmlFor="depStation">Departure Station</label>
                <div className="input-with-icon">
                  <MapPin size={18} className="field-icon" />
                  <input
                    id="depStation"
                    type="text"
                    value={updatedTrip.depStation}
                    onChange={(e) =>
                      setUpdatedTrip({ ...updatedTrip, depStation: e.target.value })
                    }
                    placeholder="Enter departure station"
                  />
                </div>
              </div>
              
              <div className="form-field-group">
                <label htmlFor="arriveStation">Arrival Station</label>
                <div className="input-with-icon">
                  <MapPin size={18} className="field-icon" />
                  <input
                    id="arriveStation"
                    type="text"
                    value={updatedTrip.arriveStation}
                    onChange={(e) =>
                      setUpdatedTrip({ ...updatedTrip, arriveStation: e.target.value })
                    }
                    placeholder="Enter arrival station"
                  />
                </div>
              </div>
              
              <div className="form-field-group">
                <label htmlFor="departureDate">Departure Date & Time</label>
                <div className="input-with-icon">
                  <Calendar size={18} className="field-icon" />
                  <input
                    id="departureDate"
                    type="date"
                    value={updatedTrip.departureDate}
                    onChange={(e) =>
                      setUpdatedTrip({ ...updatedTrip, departureDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="edit-form-actions">
              <button className="cancel-button" onClick={cancelEdit}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminDashboardFooter />
    </div>
  );
};

export default EditTrip;