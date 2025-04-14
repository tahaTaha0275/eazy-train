import React from 'react';
const checkImagePath = './src/check.png';



const Congratulations = () => {
  return (
    <div className="congratulations-section">
      {/* Image above the heading */}
      <img
        className="check-image"
        src={checkImagePath}
        alt="Success Checkmark"
      />
      <h1>Congratulations! You have successfully booked tickets</h1>
      <p>Please carry your ID, and ensure you arrive at least 15 minutes prior to boarding.</p>
    </div>
  );
};

export default Congratulations;
