import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/MyTicketsList.css';

const MyTicketsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      // look in both storages for your JWT
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

  return (
    <div className="tickets-container">
      {bookings.length === 0 ? (
        <div className="no-tickets">No tickets found</div>
      ) : (
        bookings.map((booking) => (
          <div key={booking.bookingId} className="ticket-card">
            <div className="ticket-header">
              <h3>Booking #{booking.bookingId.slice(0, 8)}</h3>
              <span className={`status ${booking.status}`}>
                {booking.status}
              </span>
            </div>
            <div className="ticket-details">
              <div className="passenger-info">
                <p>Passenger: {booking.passengerInfo?.name || 'N/A'}</p>
                <p>Contact:   {booking.passengerInfo?.contact || 'N/A'}</p>
              </div>
              <div className="travel-info">
                <p>Train ID: {booking.trainId}</p>
                <p>Seat:     {booking.seatId}</p>
                <p>Booked:   {new Date(booking.bookedAt).toLocaleDateString()}</p>
              </div>
              <div className="payment-info">
                <p>Amount: SAR {booking.payment.amount}</p>
                <p>Method: {booking.payment.method}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyTicketsList;
