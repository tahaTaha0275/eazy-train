import React from 'react';

export default function BoardingDetails({ train, ticketType }) {
  return (
    <div className={"boarding-details-container"}>
      <div className={"header"}>
        <h3 className={"title"}>Boarding Details</h3>
        <div className={"classInfo"}>
          Class {ticketType === "business" ? "1A" : "2A"} & Tatkal Quota
        </div>
      </div>

      <div className={"stationInfo"}>
        <div className={"stationName"}>
          {train ? `${train.id}430 - ${train.station}` : "12430 - Riyadh Railway Station"}
        </div>
      </div>

      <div className={"journeyInfo"}>
        <div className={"departureInfo"}>
          <div className={"dateLabel"}>Nov 16</div>
          <div className={"timeLabel"}>{train ? train.departureTime : "11:25 pm"}</div>
          <div className={"locationLabel"}>{train ? train.origin : "Riyadh, Saudi Arabia"}</div>
        </div>

        <div className={"durationContainer"}>
          <div className={"durationLine"}>
            <div className={"durationDot"}></div>
            <div className={"durationDot"}></div>
          </div>
          <div className={"durationLabel"}>{train ? train.duration : "4 hours"}</div>
        </div>

        <div className={"arrivalInfo"}>
          <div className={"dateLabel"}>Nov 17</div>
          <div className={"timeLabel"}>{train ? train.arrivalTime : "3:25 am"}</div>
          <div className={"locationLabel"}>{train ? train.destination : "Dammam, Saudi Arabia"}</div>
        </div>
      </div>

      <button className={"changeButton"}>Change Boarding Station</button>
    </div>
  );
}
