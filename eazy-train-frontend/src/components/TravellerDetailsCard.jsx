
import { useState } from "react"
import "./styles/TravellerDetailsCard.css"
import axios from "axios"
import {jwtDecode} from 'jwt-decode';

const TravellerDetailsCard = () => {

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
      name: formData.get("name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      nationality: formData.get("nationality"),
      nationalID: formData.get("nationalID"),
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
    <div className="traveller-details-card">
      <form onSubmit = {handleSubmit} className="traveller-form">
        <h3 className="form-section-title">Traveller Details</h3>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Name of Traveller"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="age"
              className="form-input"
              placeholder="Age"
            />
          </div>

          <div className="form-group">
            <div className="select-wrapper">
              <select name="gender"  className="form-select">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="nationality"
              className="form-input"
              placeholder="Nationality"
            />
          </div>

          <div className="form-group id-type-group">
            <div className="select-wrapper">
              <select name="nationalID"  className="form-select">
                <option value="">National ID/ Iqama/ Passport</option>
                <option value="national-id">National ID</option>
                <option value="iqama">Iqama</option>
                <option value="passport">Passport</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <div className="form-group save-button-container">
            <button className="save-button" >
                Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TravellerDetailsCard