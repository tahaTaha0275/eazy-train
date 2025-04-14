import { TrainList } from "../components/TrainList"
import { SearchForm } from "../components/SearchForm"
import { DateSelector } from "../components/DateSelector"
import "./Tickets.css"

export default function Tickets(){
  return (
    <main className={"main"} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className={"contentGrid"}>
          <div className={"sidebar"}>
            <h1 className={"sidebarTitle"}>Your Search Results</h1>
            <SearchForm />
            <DateSelector />
          </div>

          <div className={"trainResults"}>
            <div className={"resultsHeader"}>
              <h2 className={"resultsTitle"}>Available Trains</h2>
              <div className={"resultsInfo"}>
                <span className={"trainCount"}>3 trains available</span>
                <button className={"filterButton"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button>
              </div>
            </div>
            <TrainList />
          </div>
        </div>
      </main>
  )
}