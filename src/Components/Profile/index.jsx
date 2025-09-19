// Profile.jsx
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import NavBar from '../NavBar'
import './index.css'
import Footer from '../Footer'

function Profile() {
  const [showPassword, setShowPassword] = useState(false)

  const username = Cookies.get('username') || 'Unknown'
  const password = Cookies.get('password') || 'Not Available'

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onLogout = async () => {
  try {
    // Call backend logout API to clear the HTTP-only cookie
    await fetch('https://tasty-kitchen-backend-1.onrender.com/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    // Navigate to login after logout
    navigate('/login', { replace: true });
  } catch (err) {
    console.error('Logout failed:', err.message);
  }
};


  return (
    <>
      <NavBar />
      <div className="profile-page">
        <div className="profile-card">
          <h2 className="profile-heading">👤 User Profile</h2>
          <div className="profile-field">
            <label>Username:</label>
            <span>{username}</span>
          </div>
          <div className="profile-field">
            <label>Password:</label>
            <span>{showPassword ? password : '••••••••'}</span>
            <button className="toggle-password-btn" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className="logout-profile-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Profile