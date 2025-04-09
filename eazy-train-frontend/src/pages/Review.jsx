import React, { useState, useEffect } from 'react';  
import { Link, useSearchParams } from 'react-router-dom';  
import TravellerForm from '../components/TravellerForm'; 
import BoardingDetails from '../components/BoardingDetails';
import BillDetails from '../components/BillDetails';
import {trainData} from '../lib/utils' 
import "./Review.css"
export default function Review() {
  const [searchParams] = useSearchParams();
  const trainId = searchParams.get("trainId");
  const ticketType = searchParams.get("ticketType");

  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    if (trainId) {
      const train = trainData.find((t) => t.id.toString() === trainId);
      if (train) {
        setSelectedTrain(train);
      }
    }
  }, [trainId]);

  if (!selectedTrain) {
    return (
      <div className={"container"}>
        <main className={"main"}>
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
            <TravellerForm />
          </div>

          <div className={"rightColumn"}>
            <BoardingDetails train={selectedTrain} ticketType={ticketType} />
            <BillDetails train={selectedTrain} ticketType={ticketType} />

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

              <button className={"bookNowButton"}>Book Now</button>

              <Link to="/checkout" className={"checkoutLink"}>
                Checkout
              </Link>
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
