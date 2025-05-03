import React from 'react';
import './styles/Ticket.css';

const Ticket = () => {
  return (
    <div className="ticket-section">
      {/* Header: PNR + Transaction ID */}
      <div className="ticket-header">
        <span className="pnr-no">PNR NO: 0456417679</span>
        <span className="transaction-id">Transaction ID: 032442606578</span>
      </div>



      {/* Train Station Info */}
      <h2 className="train-station">12430 - Riyadh Railway Station</h2>

      {/* Journey Info: Departure + line + Arrival */}
      <div className="journey-info">
        <div className="journey-block departure">
          <div className="date-time">
            <span className="date-label">Nov 16 </span>
            <span className="time-label">11:25 pm</span>
          </div>
          <div className="location">Riyadh, Saudi Arabia</div>
        </div>

        {/* Journey line with trip duration above it */}
        <div className="line-container">
          <div className="trip-duration">Trip Duration: 4 hours</div>
          <div className="line"></div>
        </div>

        <div className="journey-block arrival">
          <div className="date-time">
            <span className="date-label">Nov 17 </span>
            <span className="time-label">3:25 pm</span>
          </div>
          <div className="location">Dammam, Saudi Arabia</div>
          <p></p>
          
        </div>
      </div>

      <p className="eticket-info">
        E-Tickets have been sent to:<br />
        <p></p>
        abduu-30-04@gmail.com
      </p>

      {/* Traveler Details */}
      <div className="traveller-details">
        <h3>Traveller Details</h3>
        <div className="traveller-info-container">
          <div className="personal-info">
            <strong>Name:</strong> Abdullah AlQalalweh<br />
            <strong>Age:</strong> 24 yrs<br />
            <strong>Gender:</strong> Male
          </div>
          <div className="booking-info">
            <strong>Booking Status:</strong> Confirmed (CNF)<br />
            <strong>Seat/Coach No:</strong> 44 (Lower berth)<br />
            <strong>Total Fare:</strong> 120.00 SAR
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;