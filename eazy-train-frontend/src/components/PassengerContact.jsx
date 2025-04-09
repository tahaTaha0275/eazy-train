import { useState, useEffect } from "react"
import "./styles/PassengerContact.css"

const PassengerContact = ({ onContactInfoChange, initialValues = {} }) => {
  const [contactInfo, setContactInfo] = useState({
    mobileNumber: initialValues.mobileNumber || "",
    emailId: initialValues.emailId || "",
  })

  const [errors, setErrors] = useState({
    mobileNumber: "",
    emailId: "",
  })

  useEffect(() => {
    // Update parent component when contact info changes
    if (onContactInfoChange) {
      onContactInfoChange(contactInfo)
    }
  }, [contactInfo, onContactInfoChange])

  const validateMobileNumber = (value) => {
    if (!value) return "Mobile number is required"
    if (!/^\d{10,15}$/.test(value.replace(/\D/g, ""))) {
      return "Please enter a valid mobile number"
    }
    return ""
  }

  const validateEmail = (value) => {
    if (!value) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  const handleInputBlur = (e) => {
    const { name, value } = e.target

    // Validate on blur
    if (name === "mobileNumber") {
      setErrors((prev) => ({
        ...prev,
        mobileNumber: validateMobileNumber(value),
      }))
    } else if (name === "emailId") {
      setErrors((prev) => ({
        ...prev,
        emailId: validateEmail(value),
      }))
    }
  }

  return (
    <div className="passenger-contact-info">
      <div className="contact-header">
        <h2 className="contact-title">Contact Details</h2>
        <span className="contact-subtitle">Your ticket info will be sent here</span>
      </div>

      <div className="contact-form">
        <div className="input-row">
          <div className="input-group">
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={contactInfo.mobileNumber}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`contact-input ${errors.mobileNumber ? "input-error" : ""}`}
              placeholder="Mobile Number"
              aria-label="Mobile Number"
              aria-invalid={!!errors.mobileNumber}
              aria-describedby={errors.mobileNumber ? "mobile-error" : undefined}
            />
            {errors.mobileNumber && (
              <span id="mobile-error" className="error-message">
                {errors.mobileNumber}
              </span>
            )}
          </div>

          <div className="input-group">
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={contactInfo.emailId}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`contact-input ${errors.emailId ? "input-error" : ""}`}
              placeholder="Email ID"
              aria-label="Email ID"
              aria-invalid={!!errors.emailId}
              aria-describedby={errors.emailId ? "email-error" : undefined}
            />
            {errors.emailId && (
              <span id="email-error" className="error-message">
                {errors.emailId}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



export default PassengerContact
