import { useState } from "react";

export function DateSelector() {
  const [days, setDays] = useState([
    { day: "Tue", date: 15, isSelected: false },
    { day: "Wed", date: 16, isSelected: true },
    { day: "Thu", date: 17, isSelected: false },
    { day: "Fri", date: 18, isSelected: false },
    { day: "Sat", date: 19, isSelected: false },
    { day: "Sun", date: 20, isSelected: false },
  ]);

  const selectDay = (selectedIndex) => {
    setDays(
      days.map((day, index) => ({
        ...day,
        isSelected: index === selectedIndex,
      })),
    );
  };

  return (
    <div className={"date-container"}>
      <button className={"navButton"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div className={"daysContainer"}>
        {days.map((day, index) => (
          <button
            key={index}
            className={`${"dayButton"} ${day.isSelected ? "selected" : ""}`}
            onClick={() => selectDay(index)}
          >
            <span className={"dayName"}>{day.day}</span>
            <span className={"dayDate"}>{day.date}</span>
          </button>
        ))}
      </div>
      <button className={"navButton"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}
