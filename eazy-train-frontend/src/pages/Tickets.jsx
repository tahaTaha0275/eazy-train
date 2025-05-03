import { TripList } from "../components/TripList"
import { SearchForm } from "../components/SearchForm"
import { DateSelector } from "../components/DateSelector"
import "./Tickets.css"
import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

export default function Tickets(){
  const  [searchParams,setSearchParams] = useSearchParams()
  const [trips,setTrips] = useState()
  const {from,to,departureDate } = {from:searchParams.get("from"),to:searchParams.get("to"),departureDate:searchParams.get("departureDate") }
  // console.log(searchParams.get("from"))
  useEffect(()  => {
    const func = async() => {
    try {
        const oneWayTrip = await axios.get(`${import.meta.env.VITE_BASE_URI}/tripsa/search`,{
          params: {
            depStation: from,
            arrivStation: to,
            departureDate: departureDate
          }
        })
        setTrips(oneWayTrip.data)
       console.log(oneWayTrip)
    }
    catch(error){
      console.log(error.message)
    }
    }
    func()
  },[])
  
  return (
    <main className={"main"} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className={"contentGrid"}>
          <div className={"sidebar"}>
            <h1 className={"sidebarTitle"}>Your Search Results</h1>
            <SearchForm from = {from} to = {to} />
            {/* <DateSelector /> */}
          </div>

          <div className={"trainResults"}>
            <div className={"resultsHeader"}>
              <h2 className={"resultsTitle"}>Available Trips</h2>
              <div className={"resultsInfo"}>
                <span className={"trainCount"}>{trips ? `${trips.length } trips available`:"0 trips available"}</span>
              </div>
            </div>
            {trips && <TripList  tripData = {trips}/>}
          </div>
        </div>
      </main>
  )
}