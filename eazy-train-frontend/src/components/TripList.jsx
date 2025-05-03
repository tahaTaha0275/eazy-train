import React from 'react'
import { useNavigate } from 'react-router-dom';
// import {tripData} from '../lib/utils' 

export function TripList({tripData}) {
    const navigate = useNavigate()

    const handleSelectTicket = (tripId, ticketType) => {
        navigate(`/tickets/review?tripId=${tripId}&ticketType=${ticketType}`);
    }
    // console.log("manga")
    console.log(tripData)
  return (
    <div className="train-container">
      {tripData.map((trip, index) => (
        <TripCard key={index} trip={trip} onSelectTicket={handleSelectTicket} />
      ))}
    </div>
  )
}

function TripCard({ trip, onSelectTicket }) {
    return (
      <div className="card">
        <div className="cardContent">
          <div className="cardHeader">
            <div>
              <h3 className="stationName">{trip.depStation } Railway Station , SAR</h3>
              
            </div>
          </div>
  
          <div className="journeyInfo">
            <div className="departureInfo">
              {/* <div className="dateLabel">Nov 16</div> */}
              <div className="dateLabel">{trip.departureDate}</div>
              {/* <div className="timeLabel">{trip.departureDate}</div> */}
              <div className="locationLabel">{trip.depStation}</div>
            </div>
  
            <div className="durationContainer">
              <div className="durationLabel">4 hours</div>
              <div className="durationLine">
                <div className="durationDot"></div>
                <div className="durationDot"></div>
              </div>
            </div>
  
            <div className="arrivalInfo">
              {/* <div className="timeLabel">{trip.arrivalTime}</div> */}
              <div className="locationLabel">{trip.arrivStation}</div>
            </div>
          </div>
  
          <div className="priceOptions">
            <button className="standardPrice" onClick={() => onSelectTicket(trip.id, "standard")}>
              <div className="priceType">Standard</div>
              <div className="priceContainer">
                <span className="priceLabel">Price</span>
                <span className="priceValue">{120} SAR</span>
              </div>
            </button>
            <button className="businessPrice" onClick={() => onSelectTicket(trip.id, "business")}>
              <div className="priceType">Business</div>
              <div className="priceContainer">
                <span className="priceLabel">Price</span>
                <span className="priceValue">{220} SAR</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  
}
