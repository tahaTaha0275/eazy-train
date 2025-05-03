import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { Link, useSearchParams } from 'react-router-dom';  
import BoardingDetails from '../components/BoardingDetails';
import BillDetails from '../components/BillDetails';
import TravellerDetailsCard from '../components/TravellerDetailsCard';
import PassengerContact from '../components/PassengerContact';
import axios from "axios"
import "./Review.css"

export default function Review() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const ticketType = searchParams.get("ticketType");

  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      if (tripId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/tripsa/${tripId}`);
          if (response?.data) {
            setSelectedTrip(response.data);
          }
        } catch (error) {
          console.error("Error fetching trip:", error.message);
        }
      }
    };
  
    fetchTrip();
  }, [tripId]);
  

  if (!selectedTrip) {
    return (
      <div className={"review-container"}>
        <main className={"main"} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className={"loading"}>Loading booking details...</div>
        </main>
      </div>
    );
  }
  
  return (
    <>
      <main className={"main"}>
        <h1 className={"pageTitle"}>Review your booking</h1>

        <div className={"reviewContainer"}>
          <div className={"leftColumn"}>
          <TravellerDetailsCard />
          <PassengerContact />
          </div>

          <div className={"rightColumn"}>
            <BoardingDetails train={selectedTrip} ticketType={ticketType} />
            <BillDetails  train={selectedTrip} ticketType={ticketType} />

            <div className={"checkoutSection"}>
              <p className={"disclaimer"}>
                I accept, read and understood all the{" "}
                <Link to="/terms" className={"disclaimerLink"}>
                  cancellation
                </Link>{" "}
                and{" "}
                <Link to="/refund" className={"disclaimerLink"}>
                  refund
                </Link>{" "}
                policies
              </p>

              <button className={"bookNowButton"} onClick={() => navigate(`/tickets/paymentportal?tripId=${tripId}&ticketType=${ticketType}`)}>Book Now</button>

            </div>
          </div>
        </div>

        <div className={"footerLinks"}>
          <Link to="/cancellation" className={"footerLink"}>
            Cancellation Policy
          </Link>
          <Link to="/terms" className={"footerLink"}>
            Terms & Conditions
          </Link>
          <Link to="/insurance" className={"footerLink"}>
            Travel Insurance
          </Link>
        </div>
      </main>
    </>
  );
}
