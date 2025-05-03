// src/components/MyBookingsList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/MyBookingsList.css';

const MyBookingsList = () => {
  const [bookings, setBookings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const token =
        localStorage.getItem('token') ??
        sessionStorage.getItem('token');

      if (!token) {
        setError('You must be logged in to view your bookings.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/myBookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Failed to fetch bookings.');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)   return <div className="error">{error}</div>;

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancelling(true);
      const token =
        localStorage.getItem('token') ??
        sessionStorage.getItem('token');

      await axios.delete(`http://localhost:8080/myBookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local state to reflect cancellation
      setBookings(bookings.map(booking =>
        booking.bookingId === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="bookings-container">
      {bookings.length === 0 ? (
        <div className="no-bookings">No bookings found</div>
      ) : (
        bookings.map((booking) => (
          <div key={booking.bookingId} className="booking-card">
            <div className="booking-header">
              <h3>Booking #{booking.bookingId}</h3>
              <span className={`status ${booking.status}`}>
                {booking.status}
              </span>
            </div>

            <div className="booking-details">
              <div className="passenger-info">
                <p>Passenger: {booking.passengerInfo?.name || 'N/A'}</p>
                <p>Contact: {booking.passengerInfo?.contact || 'N/A'}</p>
              </div>

              <div className="travel-info">
                <p>Trip ID: {booking.tripId.split("/")[2]}</p>
                <p>Seat: {booking.seatId}</p>
                <p>Booked: {new Date(booking.bookedAt).toLocaleDateString()}</p>
              </div>

              <div className="payment-info">
                <p>Amount: SAR {booking.payment.amount}</p>
                <p>Method: {booking.payment.method}</p>
              </div>

              <button
                className="cancelBooking-button"
                onClick={() => handleCancel(booking.bookingId)}
                disabled={booking.status !== 'confirmed' || cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Cancel'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookingsList;
