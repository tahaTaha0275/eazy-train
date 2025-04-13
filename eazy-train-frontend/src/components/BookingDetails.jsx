import React, { useState } from 'react';

const BookingDetails = () => {
  return (
    <div className="booking-details">
      <h2 className="section-title">Booking Details</h2>
      <div className="booking-info">
        <div className="route">
          <p><strong>From:</strong> New York (JFK)</p>
          <p><strong>To:</strong> London (LHR)</p>
        </div>
        <div className="datetime">
          <p><strong>Date:</strong> October 15, 2025</p>
          <p><strong>Time:</strong> 8:00 AM - 10:00 AM</p>
        </div>
      </div>
      <div className="passenger-info">
        <h3>Passenger Information</h3>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Seat:</strong> 12A</p>
      </div>
    </div>
  );
};

export default BookingDetails;
  