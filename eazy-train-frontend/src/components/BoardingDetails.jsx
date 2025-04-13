import React from 'react';
import './styles/BoardingDetails.css';

export default function BoardingDetails({
  train,
  ticketType = 'economy',
  traveler = {
    name: 'Abdullah AlQalalweh',
    age: '24 Yrs',
    gender: 'Male',
    berth: 'Lower Berth',
    email: 'abduu-30-04@hotmail.com',
    isPrimary: true,
  },
  quota = 'Tatkal Quota',
}) {
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
          {train
            ? `${train.id || '124'}30 - ${train.station || 'Riyadh Railway Station'}`
            : "12430 - Riyadh Railway Station"
          }
        </div>
      </div>

      {/* Journey Info */}
      <div className="journey-info">
        {/* Departure */}
        <div className="departure-info">
          <div className="date-label">Nov 16</div>
          <div className="time-label">
            {train ? train.departureTime : "11:25 pm"}
          </div>
          <div className="location-label">
            {train ? train.origin : "Riyadh, Saudi Arabia"}
          </div>
        </div>

        {/* Duration */}
        <div className="duration-container">
          <div className="duration-line">
            <div className="duration-dot"></div>
            <div className="duration-dot"></div>
          </div>
          <div className="duration-label">
            {train ? train.duration : "4 hours"}
          </div>
        </div>

        {/* Arrival */}
        <div className="arrival-info">
          <div className="date-label">Nov 17</div>
          <div className="time-label">
            {train ? train.arrivalTime : "3:25 am"}
          </div>
          <div className="location-label">
            {train ? train.destination : "Dammam, Saudi Arabia"}
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Traveller Details */}
      <div className="traveller-details">
        <h3>Traveller Details</h3>
        <div className="traveller-row">
          <strong>{traveler.name}</strong>
          <span>{traveler.age}</span>
          <span>{traveler.gender}</span>
          <span>{traveler.berth}</span>
        </div>

        <div className="eticket-info">
          <div className="eticket-label">
            <p><strong>E-Tickets will be sent to:</strong></p>
          </div>
          <div className="eticket-destination">
            
            <p>{traveler.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
