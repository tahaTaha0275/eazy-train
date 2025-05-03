import { useState, useEffect } from "react"
import {jwtDecode} from 'jwt-decode';
import "./styles/PassengerContact.css"
import axios from "axios"
const PassengerContact = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  let userId = ""
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id
    console.log("User ID:", decoded.id);  // or .username, .role, etc.
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const data = {
      phone: formData.get("mobileNumber")
    };
  
    console.log("Traveller Data:", data);
    
    try {
      const response = await axios.put(`http://localhost:8080/user/${userId}`, data);
      console.log('✅ PUT successful:', response.data);
    } catch (error) {
      console.error('❌ PUT failed:', error.message);
    }
    
  
  };

  return (
    <div className="passenger-contact-info">
      <div className="contact-header">
        <h2 className="contact-title">Contact Details</h2>
        <span className="contact-subtitle">Your ticket info will be sent here</span>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-row">
          <div className="input-group">
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              className={`contact-input`}
              placeholder="Mobile Number"
            />
          </div>

          <div className="input-group">
            <button className="save-button" >
                Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}



export default PassengerContact
