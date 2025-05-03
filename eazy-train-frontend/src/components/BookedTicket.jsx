import React from 'react';
import './styles/BookedTicket.css';
import Congratulations from './Congratulations';
import Ticket from './Ticket';
import Barcode from './Barcode';

const BookedTicket = () => {
  const [searchParams, setSearchParams] = React.useState(new URLSearchParams(window.location.search));
  const tripId = searchParams.get('tripId');
  const ticketType = searchParams.get('ticketType');
  const userId = searchParams.get('userId');
  const name = searchParams.get('name');
  const [ticketDetails, setTicketDetails] = React.useState({
    tripId: tripId,
    ticketType: ticketType,
    userId: userId,
    name: name
  });
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
