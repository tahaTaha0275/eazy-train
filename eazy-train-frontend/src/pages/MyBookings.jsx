import MyBookingsList  from "../components/MyBookingsList"
import "./MyBookings.css"

export default function MyBookings(){
  return (
    <main className={"mainBookings"} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className={"myTrains"}>
            <div className={"resultsHeader"}>
              <h2 className={"resultsTitle"}>Your Bookings</h2>
            </div>
            <MyBookingsList />
          </div>
      </main>
  )
}