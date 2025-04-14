import React from 'react';
import './styles/BookedTicket.css';
import Congratulations from './Congratulations';
import Ticket from './Ticket';
import Barcode from './Barcode';

const BookedTicket = () => {
  return (
    <div className="booked-ticket">
      {/* Top success message */}
      <Congratulations />

      <div className="booked-ticket-content">
        <div className="left-part">
          <Ticket />
        </div>
        <div className="right-part">
          <Barcode />
        </div>
      </div>
    </div>
  );
};

export default BookedTicket;
