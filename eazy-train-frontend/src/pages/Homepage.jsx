import { useState } from "react"
import axios from "axios"
import Title from "../components/Title"
import TripToggle from "../components/TripToggle"
import SearchInput from "../components/SearchInput"
import DateInput from "../components/DateInput"
import SearchButton from "../components/SearchButton"
import Footer from "../components/Footer"
import "./Homepage.css"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const navigate = useNavigate()
  const handleSearch = async (e) => {
    e.preventDefault()
    // console.log({from,to,departureDate})
    navigate(`/tickets?from=${from}&to=${to}&departureDate=${departureDate}`)
    // Navigate to search results or tickets page
  }

  return (
    <div className="homepage-container">
      <Title />

      <div className="search-container">

        <form onSubmit={handleSearch} className="search-form">
          <div className="home-row">
            <SearchInput placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
            <SearchInput placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>

          <div className="home-row">
            <DateInput
              placeholder="Departure Date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              />
          </div>

          <SearchButton>Search for trains</SearchButton>
        </form>
      </div>
      <Footer  inHome = {true}/>
    </div>
  )
}

export default Homepage
