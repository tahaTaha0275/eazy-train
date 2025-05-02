import React from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import {trainData} from '../lib/utils' 
import "./styles/MyTicketsList.css"
export default function MyTicketsList() {
  
    const navigate = useNavigate()

    const handleSelectTicket = (trainId, ticketType) => {
        navigate(`/tickets/review?trainId=${trainId}&ticketType=${ticketType}`);
      }

  return (
    <div className="bookings-container">
      {trainData.map((train, index) => (
        <TrainCard key={index} train={train} onSelectTicket={handleSelectTicket} />
      ))}
    </div>
  )
}

function TrainCard({ train, onSelectTicket }) {
    return (
      <div className="booking-card">
        <div className="bookingContent">
          <div className="bookingHeader">
            <div>
              <h3 className="stationName">{train.station}</h3>
              <div className="runsOnContainer">
                <span className="runsOnLabel">Runs on</span>
                <div className="runsOnBadge">{train.runsOn}</div>
              </div>
            </div>
          </div>
  
          <div className="journeyInfo">
            <div className="departureInfo">
              <div className="dateLabel">Nov 16</div>
              <div className="timeLabel">{train.departureTime}</div>
              <div className="locationLabel">{train.origin}</div>
            </div>
  
            <div className="durationContainer">
              <div className="durationLabel">{train.duration}</div>
              <div className="durationLine">
                <div className="durationDot"></div>
                <div className="durationDot"></div>
              </div>
            </div>
  
            <div className="arrivalInfo">
              <div className="dateLabel">Nov 17</div>
              <div className="timeLabel">{train.arrivalTime}</div>
              <div className="locationLabel">{train.destination}</div>
            </div>
          </div>
  
          <div className="modifyOptions">
            <button className="modifyBtn" onClick={() => onSelectTicket(train.id, "standard")}>
              <div>Modify Booking</div>
            </button>
            <button className="cancelBtn" onClick={() => onSelectTicket(train.id, "business")}>
              <div>Cancel Booking</div>
            </button>
          </div>
        </div>
      </div>
    )
  
}
