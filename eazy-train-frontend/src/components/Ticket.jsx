import React from 'react';
import './styles/Ticket.css';

const Ticket = ({ depStation, arriveStation, name, username, departureTime ,ticket}) => {
  return (
    <div className="ticket-section">
      {/* Train Station Info */}
      <h2 className="train-station">{`${depStation} - ${arriveStation} Railway Station`}</h2>

      {/* Journey Info: Departure + line + Arrival */}
      <div className="journey-info">
        <div className="journey-block departure">
          <div className="date-time">
            <span className="date-label">{departureTime}</span>
          </div>
          <div className="location">{depStation}</div>
        </div>

        {/* Journey line with trip duration above it */}
        <div className="line-container">
          <div className="trip-duration">Trip Duration: 4 hours</div>
          <div className="line"></div>
        </div>

        <div className="journey-block arrival">
          <div className="date-time">
            <span className="date-label">{departureTime}</span>
          </div>
          <div className="location">{arriveStation}</div>
        </div>
      </div>

      <p className="eticket-info">
        E-Tickets have been sent to:<br />
        <p></p>
        {username}
      </p>

      {/* Traveler Details */}
      <div className="traveller-details">
        <h3>Traveller Details</h3>
        <div className="traveller-info-container">
          <div className="personal-info">
            <strong>Name:</strong> {name}<br />

          </div>
          <div className="booking-info">
            <strong>Booking Status:</strong> Confirmed (CNF)<br />
            <strong>Total Fare:</strong> {ticket == "business" ? 220 : 120.00 }SAR
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;