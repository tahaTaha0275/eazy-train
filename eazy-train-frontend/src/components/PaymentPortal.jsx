import React, { useState } from 'react';
import BookingDetails from './BoardingDetails';
import PaymentMethods from './PaymentMethods';
import BillDetails from './BillDetails';
import './styles/PaymentPortal.css'; 

const PaymentPortal = () => {
  return (
    <div className="payment-portal">

      <main className="payment-portal-main">
        <h1 className="portal-title">Review Your Booking</h1>

        <div className="content-grid">
          <div className="left-column">
            <BookingDetails />
          </div>
          <div className="right-column">
            <BillDetails />
          </div>
        </div>

        <PaymentMethods />
      </main>

    </div>
  );
};

export default PaymentPortal;