import "./styles/TripToggle.css"

const TripToggle = ({ tripType, setTripType }) => {
  return (
    <div className="trip-toggle">
      <button
        className={`toggle-btn ${tripType === "roundTrip" ? "active" : ""}`}
        onClick={() => setTripType("roundTrip")}
      >
        Round Trip
      </button>
      <button className={`toggle-btn ${tripType === "oneWay" ? "active" : ""}`} onClick={() => setTripType("oneWay")}>
        One Way
      </button>
    </div>
  )
}

export default TripToggle
