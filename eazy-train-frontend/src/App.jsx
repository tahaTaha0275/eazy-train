import {Routes, Route } from 'react-router-dom'

import Tickets from './pages/Tickets' 
import Layout from './pages/Layout'
import Review from "./pages/Review"
import PaymentPortal from './components/paymentPortal'

import "./components/styles/BillDetails.css"
import "./components/styles/BoardingDetails.css"
import "./components/styles/DateSelector.css"
import "./components/styles/Footer.css"
import "./components/styles/Header.css"
import "./components/styles/SearchForm.css"
import "./components/styles/TrainList.css"
// import "./components/styles/TravellerForm.css"
import "./components/BookedTicket"
import BookedTicket from './components/BookedTicket'


function App() {
  return (
        <div className={"container"}>
            <Routes>
              <Route path="/" element = {<Layout />}>
                <Route index element={<Tickets />} />
                <Route path='/review' element={<Review />} />
                <Route path='/paymentportal' element={<PaymentPortal />} />
                <Route path='/BookedTicket' element={<BookedTicket />} />
              </Route>
            </Routes>
        </div>
  )
}

export default App
