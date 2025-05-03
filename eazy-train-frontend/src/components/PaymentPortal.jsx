import React, { useState, useEffect } from 'react';
import BookingDetails from './BoardingDetails';
import PaymentMethods from './PaymentMethods';
import BillDetails from './BillDetails';
import { useSearchParams } from 'react-router-dom';
import axios from "axios"
import './styles/PaymentPortal.css'; 

const PaymentPortal = () => {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const ticketType = searchParams.get("ticketType");
  console.log(ticketType)
  console.log(searchParams)
  const [selectedTrip,setSelectedTrip] = useState();
  useEffect(() => {
      const fetchTrip = async () => {
        if (tripId) {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/tripsa/${tripId}`);
            if (response?.data) {
              console.log("Trip data:", response.data);
              setSelectedTrip(response.data);
            }
          } catch (error) {
            console.log("Error fetching trip:", error.message);
          }
        }
      };
    
      fetchTrip();
    }, [tripId]);

    // console.log(tripId)

  return (
    <div className="payment-portal">

      <main className="payment-portal-main">
        <h1 className="portal-title">Review Your Booking</h1>

        <div className="content-grid">
          <div className="left-column">
            {selectedTrip && <BookingDetails train = {selectedTrip}/>}
          </div>
          <div className="right-column">
            {selectedTrip && <BillDetails train = {selectedTrip} ticketType={ticketType}/>}
          </div>
        </div>

        {selectedTrip && <PaymentMethods tripId = {selectedTrip.id} ticketType={ticketType} />}
      </main>

    </div>
  );
};

export default PaymentPortal;