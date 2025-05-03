// src/components/Header.jsx

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function getTokenSource() {
  if (localStorage.getItem('token')) {
    return localStorage
  } else if (sessionStorage.getItem('token')) {
    return sessionStorage
  } else {
    return null
  }
}

export default function Header() {
  const navigate = useNavigate()

  const handleLogOut = (e) => {
    e.preventDefault()
    const storage = getTokenSource()
    if (storage) {
      storage.removeItem('token')
    }
    navigate('/')
  }

  return (
    <header className="header">
      <Link to="/home" className="logo">
        <span className="logoBlue">Eazy</span>
        <span className="logoBlack">Train</span>
      </Link>

      <div className="headerLinks">
        <Link to="/tickets/mybookings" className="bookingLink">
          Tickets
        </Link>
        <div className="divider" />
        <Link to="/tickets/mybookings" className="bookingLink">
          My Booking
        </Link>
        <div className="divider" />
        <button onClick={handleLogOut} className="red-button">
          Log out
        </button>
      </div>
    </header>
  )
}
