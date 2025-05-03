import React from 'react';
import './styles/BoardingDetails.css';
import {jwtDecode} from 'jwt-decode';

export default function BoardingDetails({
  train,
  ticketType = 'economy',
  quota = 'Tatkal Quota',
}) {
  // console.log(train)
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  let username = ""
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username;
  }
  return (
    <div className="boarding-details-container">
      
      {/* Header Section */}
      <div className="booking-header">
        <h3 className="title">Boarding Details</h3>
        <div className="class-info">
          Class {ticketType === "business" ? "1A" : "2A"} &amp; {quota}
        </div>
      </div>

      {/* Station Name / ID */}
      <div className="station-info">
        <div className="station-name">
          {train && `${train.id }`}
        </div>
        <div className="station-name">
          {train && `${train.depStation + '  Railway Station'}`}
        </div>
      </div>

      {/* Journey Info */}
      <div className="journey-info">
        {/* Departure */}
        <div className="departure-info">
          <div className="location-label">{train.depStation}</div>

          <div className="time-label">
            {train && train.departureTime }
          </div>
          
        </div>

        {/* Duration */}
        <div className="duration-container">
          <div className="duration-line">
            <div className="duration-dot"></div>
            <div className="duration-dot"></div>
          </div>
          <div className="duration-label">
            {"4 hours"}
          </div>
          <div className="date-label">{train.departureDate}</div>

        </div>

        {/* Arrival */}
        <div className="arrival-info">
        <div className="location-label">{train.arriveStation}</div>

          <div className="time-label">
            {train ? train.arrivalTime : "3:25 am"}
          </div>
          <div className="location-label">
            {train ? train.arrivStation : "Dammam, Saudi Arabia"}
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Traveller Details */}
      <div className="traveller-details">
        <h3>Traveller Details</h3>
        <div className="eticket-info">
          <div className="eticket-label">
            <p><strong>E-Tickets will be sent to: {`${username}`}</strong></p>
          </div>
         
        </div>
      </div>
    </div>
  );
}
