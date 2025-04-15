import { Calendar } from "lucide-react"
import "./styles/DateInput.css"

const DateInput = ({ placeholder, value, onChange, required = true, disabled = false }) => {
  return (
    <div className="date-input-wrapper">
      <div className={`date-input-container ${disabled ? "disabled" : ""}`}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="date-input"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text"
          }}
        />
        <Calendar className="calendar-icon" size={20} />
      </div>
    </div>
  )
}

export default DateInput
