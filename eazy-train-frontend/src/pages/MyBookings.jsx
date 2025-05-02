import MyTicketsList  from "../components/MyTicketsList"
import "./MyBookings.css"

export default function MyBookings(){
  return (
    <main className={"mainBookings"} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className={"myTrains"}>
            <div className={"resultsHeader"}>
              <h2 className={"resultsTitle"}>Your Tickets</h2>
            </div>
            <MyTicketsList />
          </div>
      </main>
  )
}