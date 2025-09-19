// NavBar.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MdShoppingBag } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";


function NavBar() {
  const [showMenu, setShowMenu] = useState(false)
  const navigate=useNavigate()
  const cartItems=useSelector((state)=>state.cart.items)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

 const onLogout = async () => {
  try {
    const res = await fetch('https://tasty-kitchen-backend-1.onrender.com/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Important to send cookies
    });

    if (res.ok) {
      console.log('Logged out successfully');
      // Clear user state if any, then redirect
      navigate('/login', { replace: true });
    } else {
      console.error('Logout failed with status:', res.status);
    }
  } catch (err) {
    console.error('Logout failed:', err.message);
  }
};



  return (
    <div>
      <div className="navbar">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img
              className="home-logo"
              src="https://i.postimg.cc/c4tcrmb5/Group-7420.png"
              alt="logo"
            />
            <p className="home-logo-name">Tasty Kitchens</p>
          </Link>
        </div>

        <button className="hamburger-icon" onClick={toggleMenu}>
          &#9776;
        </button>
<div className="nav-buttons">
  <Link to="/">
    <button className="home-button">Home</button>
  </Link>

  <Link to="/cart" className="cart-link-wrapper">
    <div className="cart-icon-wrapper">
      <MdShoppingBag className="cart-icon" />
      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </div>
  </Link>

  <button className="logout-button" onClick={onLogout}>Logout</button>

  <Link to="/profile">
    <FaUserCircle className="profile-icon" />
  </Link>
</div>

      </div>

      {showMenu && (
        <div className="mobile-menu">
          <Link to="/">
            <button className="home-hamburger-button" onClick={() => setShowMenu(false)}>Home</button>
          </Link>
         <Link to="/cart" className="cart-link-wrapper">
            <div className="cart-icon-wrapper">
              <MdShoppingBag className="cart-icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </Link>

            <button className="logout-hamburger-button" onClick={onLogout}>Logout</button>

            <Link to="/profile">
  <FaUserCircle className="profile-icon" onClick={() => setShowMenu(false)} />
</Link>

       
        </div>
      )}
    </div>
  )
}

export default NavBar