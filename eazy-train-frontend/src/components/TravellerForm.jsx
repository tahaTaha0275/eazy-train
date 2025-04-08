import React, { useState } from 'react';

export default function TravellerForm() {
  const [travellers, setTravellers] = useState([{ id: 1, name: "Abdullah AlOtaishah" }]);
  const [activeTab, setActiveTab] = useState("traveller");

  return (
    <div className={"traveller-form-container"}>
      <div className={"tabs"}>
        <button
          className={`${"tab"} ${activeTab === "traveller" ? "activeTab" : ""}`}
          onClick={() => setActiveTab("traveller")}
        >
          Traveller Details
        </button>
        <button
          className={`${"tab"} ${activeTab === "contact" ? "activeTab" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact Details
        </button>
      </div>

      {activeTab === "traveller" && (
        <div className={"tabContent"}>
          <p className={"tabDescription"}>As per IRCTC/Railways rules, you can book up to 6 travellers at once</p>
          <div className={"travellerList"}>
            {travellers.map((traveller, index) => (
              <div key={traveller.id} className={"travellerItem"}>
                <div className={"travellerNumber"}>{index + 1}.</div>
                <div className={"travellerName"}>{traveller.name}</div>
                <div className={"travellerActions"}>
                  <button className={"editButton"}>
                    {/* Icon for edit */}
                  </button>
                  <button className={"deleteButton"}>
                    {/* Icon for delete */}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={"travellerForm"}>
            {/* Form fields for traveller details */}
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className={"tabContent"}>
          <p className={"tabDescription"}>Your ticket and all travel info will be sent here</p>
          <div className={"contactForm"}>
            {/* Form fields for contact details */}
          </div>
        </div>
      )}
    </div>
  );
}
