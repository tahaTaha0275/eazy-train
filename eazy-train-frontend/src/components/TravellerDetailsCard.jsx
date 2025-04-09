
import { useState } from "react"
import "./styles/TravellerDetailsCard.css"

const TravellerDetailsCard = () => {
  const [travellers, setTravellers] = useState([{ id: 1, name: "Ahmed Adel" }])

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    nationality: "",
    idType: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddTraveller = () => {
    // Reset form to add a new traveller
    setFormData({
      name: "",
      age: "",
      gender: "",
      nationality: "",
      idType: "",
    })
  }

  const handleEditTraveller = (id) => {
    const traveller = travellers.find((t) => t.id === id)
    if (traveller) {
      setFormData({
        name: traveller.name,
        age: traveller.age || "",
        gender: traveller.gender || "",
        nationality: traveller.nationality || "",
        idType: traveller.idType || "",
      })
    }
  }

  const handleDeleteTraveller = (id) => {
    setTravellers(travellers.filter((t) => t.id !== id))
  }

  const handleSave = () => {
    if (!formData.name) return // Basic validation

    const existingIndex = travellers.findIndex((t) => t.name === formData.name)

    if (existingIndex >= 0) {
      // Update existing traveller
      const updatedTravellers = [...travellers]
      updatedTravellers[existingIndex] = {
        ...updatedTravellers[existingIndex],
        ...formData,
      }
      setTravellers(updatedTravellers)
    } else {
      // Add new traveller
      const newTraveller = {
        id: Date.now(),
        ...formData,
      }
      setTravellers([...travellers, newTraveller])
    }

    // Reset form after save
    setFormData({
      name: "",
      age: "",
      gender: "",
      nationality: "",
      idType: "",
    })
  }

  return (
    <div className="traveller-details-card">
      <div className="traveller-header">
        <div className="traveller-title-container">
          <h2 className="traveller-title">Traveller Details</h2>
          <span className="traveller-subtitle">As per IRCTC Guidelines, you can book up to 4 travellers at once</span>
        </div>
        <button className="add-traveller-button" onClick={handleAddTraveller} aria-label="Add traveller">
          <span className="plus-icon">+</span>
        </button>
      </div>

      <div className="traveller-list">
        {travellers.map((traveller, index) => (
          <div key={traveller.id} className="traveller-item">
            <div className="traveller-index">{index + 1}.</div>
            <div className="traveller-name">{traveller.name}</div>
            <div className="traveller-actions">
              <button
                className="edit-button"
                onClick={() => handleEditTraveller(traveller.id)}
                aria-label="Edit traveller"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteTraveller(traveller.id)}
                aria-label="Delete traveller"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="traveller-form">
        <h3 className="form-section-title">Traveller Details</h3>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Name of Traveller"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Age"
            />
          </div>

          <div className="form-group">
            <div className="select-wrapper">
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-select">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
              value={formData.nationality}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nationality"
            />
          </div>

          <div className="form-group id-type-group">
            <div className="select-wrapper">
              <select name="idType" value={formData.idType} onChange={handleInputChange} className="form-select">
                <option value="">National ID/ Iqama/ Passport</option>
                <option value="national-id">National ID</option>
                <option value="iqama">Iqama</option>
                <option value="passport">Passport</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <div className="form-group save-button-container">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravellerDetailsCard
