import React, { useState } from 'react';
import './styles/PaymentMethod.css';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('');

  // Card details in local state (demo)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div className="payment-method">
      <h2 className="payment-method-title">All Payment Options</h2>

      {/* Payment option #1: Credit / Debit Card */}
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

              {/* CVV field + Pay button below it */}
              <div>
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />

                {/* New Pay button below CVV */}
              </div>
            </div>
            <div>
              <button className="pay-button" type="button">
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
            <button className="applepay-button" type="button">
              Pay by ApplePay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
