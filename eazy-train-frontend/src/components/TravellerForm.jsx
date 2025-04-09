import React, { useState } from 'react';

export default function TravellerForm() {
  const [travellers, setTravellers] = useState([{ id: 1, name: "Ahmed Taha" }]);
  // const [activeTab, setActiveTab] = useState("traveller");

  return (
    <div className={"traveller-form-container"}>
     
        <div className={"tabContent"}>
          <p className={"tabDescription"}>As per IRCTC/Railways rules, you can book up to 6 travellers at once</p>
          <div className={"travellerList"}>
            {travellers.map((traveller, index) => (
              <div key={traveller.id} className={"travellerItem"}>
                <div className={"travellerNumber"}>{index + 1}.</div>
                <div className={"travellerName"}>{traveller.name}</div>
                <div className={"travellerActions"}>
                  <button className={"editButton"}>
                  </button>
                  <button className={"deleteButton"}>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className={"tabContent"}>
          <p className={"tabDescription"}>Your ticket and all travel info will be sent here</p>
        </div>
    </div>
  );
}
