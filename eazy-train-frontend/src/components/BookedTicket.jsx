import React from 'react';
import './styles/BookedTicket.css';
import Congratulations from './Congratulations';
import Ticket from './Ticket';
import Barcode from './Barcode';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const BookedTicket = () => {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const userId = searchParams.get("userId");
  const ticketType = searchParams.get("ticketType");
  const [selectedTrip,setSelectedTrip] = useState();
  const [selectedUser,setSelectedUser] = useState();

  useEffect(() => {
      const fetchTrip = async () => {
        if (tripId) {
          try {
            const response = await axios.get(`http://localhost:8080/trips/${tripId}`);
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
    console.log(selectedTrip)
    useEffect(() => {
      const fetchUser = async () => {
        if (userId) {
          try {
            const response = await axios.get(`http://localhost:8080/user/${userId}`);
            if (response?.data) {
              console.log("User data:", response.data);
              setSelectedUser(response.data);
            }
          } catch (error) {
            console.log("Error fetching trip:", error.message);
          }
        }
      };
    
      fetchUser();
    }, [userId]);

  return (
    <div className="booked-ticket">
      {/* Top success message */}
      <Congratulations />

      <div className="booked-ticket-content">
        <div className="left-part">
          {(selectedTrip && selectedUser) && <Ticket depStation = {selectedTrip.depStation} arriveStation = {selectedTrip.arriveStation}  username = {selectedUser.email} name = {selectedUser.name} departureTime = {selectedTrip.departureDate} ticket = {ticketType}/>}
        </div>
        <div className="right-part">
          <Barcode />
        </div>
      </div>
    </div>
  );
};

export default BookedTicket;
