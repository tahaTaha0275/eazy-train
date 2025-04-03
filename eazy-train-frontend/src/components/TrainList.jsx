import React from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import {trainData} from '../lib/utils' 

export function TrainList() {
    const navigate = useNavigate()

    const handleSelectTicket = (trainId, ticketType) => {
        navigate(`/review?trainId=${trainId}&ticketType=${ticketType}`);
      }

  return (
    <div className="train-container">
      {trainData.map((train, index) => (
        <TrainCard key={index} train={train} onSelectTicket={handleSelectTicket} />
      ))}
    </div>
  )
}

function TrainCard({ train, onSelectTicket }) {
    return (
      <div className="card">
        <div className="cardContent">
          <div className="cardHeader">
            <div>
              <h3 className="stationName">{train.station}</h3>
              <div className="runsOnContainer">
                <span className="runsOnLabel">Runs on</span>
                <div className="runsOnBadge">{train.runsOn}</div>
              </div>
            </div>
            <Link to="#" className="timetableLink">View train time table</Link>
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
  
          <div className="priceOptions">
            <button className="standardPrice" onClick={() => onSelectTicket(train.id, "standard")}>
              <div className="priceType">Standard</div>
              <div className="priceContainer">
                <span className="priceLabel">Price</span>
                <span className="priceValue">{train.standardPrice} SAR</span>
              </div>
            </button>
            <button className="businessPrice" onClick={() => onSelectTicket(train.id, "business")}>
              <div className="priceType">Business</div>
              <div className="priceContainer">
                <span className="priceLabel">Price</span>
                <span className="priceValue">{train.businessPrice} SAR</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  
}
