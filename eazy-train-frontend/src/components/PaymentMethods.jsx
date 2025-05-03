import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './styles/PaymentMethod.css';
import axios from "axios"
const PaymentMethods = ({tripId,ticketType}) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigate = useNavigate();

  // Card details in local state (demo)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };
  console.log(ticketType)
  // Redirect user when they press the pay button.
  const handlePayClick = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const name = decoded.username;
      const price = ticketType === "business" ? 220 : 120;
  
      // Get user phone from backend
      // const phoneResponse = await axios.get(`http://localhost:8080/user/phone/${userId}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });
      const userData = await axios.get(`http://localhost:8080/user/${userId}`);
      console.log(userData.data)
   
      // Send booking request with token in headers
      const response = await axios.post("http://localhost:8080/myBookings", {
        name: userData.data.name,
        contact: userData.data.phone,
        tripId: tripId,
        userId: userId,
        amount: price,
        method: selectedMethod
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("✅ Booking response:", response.data);
      navigate(`/tickets/bookedticket?name=${name}&tripId=${tripId}&ticketType=${ticketType}&userId=${userId}`);
    } catch (error) {
      console.error("❌ Booking failed:", error.message);
    }
  };
  
  

  return (
    <div className="payment-method">
      <h2 className="payment-method-title">All Payment Options</h2>

      <div
        className={`payment-option ${
          selectedMethod === 'creditCard' ? 'selected' : ''
        }`}
      >
        <input
          type="radio"
          id="creditCard"
          name="paymentMethod"
          value="creditCard"
          checked={selectedMethod === 'creditCard'}
          onChange={handleMethodChange}
        />
        <label htmlFor="creditCard" className="payment-option-label">
          <div className="option-heading">Credit / Debit Card</div>
          <div className="option-subtext">
            Visa, Mastercard, ommnx, Ripay and more
          </div>
        </label>
        <span className="arrow-indicator">{'>'}</span>

        {/* Show card form if "Credit / Debit Card" is selected */}
        {selectedMethod === 'creditCard' && (
          <div className="credit-card-form">
            <div className="form-row">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="xxxx xxxx xxxx xxxx"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="cardHolder">Cardholder Name</label>
              <input
                type="text"
                id="cardHolder"
                placeholder="John Doe"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </div>

            {/* Expiry Date & CVV side by side */}
            <div className="form-row small-inputs">
              {/* Expiry Date field */}
              <div>
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>

              {/* CVV field */}
              <div>
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="pay-button" type="button" onClick={handlePayClick}>
                Pay
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment option #2: ApplePay (example) */}
      <div
        className={`payment-option ${
          selectedMethod === 'applePay' ? 'selected' : ''
        }`}
      >
        <input
          type="radio"
          id="applePay"
          name="paymentMethod"
          value="applePay"
          checked={selectedMethod === 'applePay'}
          onChange={handleMethodChange}
        />
        <label htmlFor="applePay" className="payment-option-label">
          <div className="option-heading">ApplePay</div>
        </label>
        <span className="arrow-indicator">{'>'}</span>

        {/* Show ApplePay form if "applePay" is selected */}
        {selectedMethod === 'applePay' && (
          <div className="applepay-form">
            <button className="applepay-button" type="button" onClick={handlePayClick}>
              <img
                src="/ap-button@2x.png"
                alt="Apple Pay"
                className="applepay-button-logo"
              />
             
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
