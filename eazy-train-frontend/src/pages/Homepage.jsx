import { useState } from "react"
import Title from "../components/Title"
import TripToggle from "../components/TripToggle"
import SearchInput from "../components/SearchInput"
import DateInput from "../components/DateInput"
import SearchButton from "../components/SearchButton"
import Footer from "../components/Footer"
import "./Homepage.css"

const Homepage = () => {
  const [tripType, setTripType] = useState("roundTrip")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Search for trains with:", {
      tripType,
      from,
      to,
      departureDate,
      returnDate,
    })
    // Navigate to search results or tickets page
  }

  return (
    <div className="homepage-container">
      <Title />

      <div className="search-container">
        <TripToggle tripType={tripType} setTripType={setTripType} />

        <form onSubmit={handleSearch} className="search-form">
          <div className="home-row">
            <SearchInput placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
            <SearchInput placeholder="TO" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>

          <div className="home-row">
            <DateInput
              placeholder="Departure Date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              />
            <DateInput
              placeholder="Return Date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required={tripType === "roundTrip"}
              disabled={tripType === "oneWay"}
              />
          </div>

          <SearchButton>Search for trains</SearchButton>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Homepage
