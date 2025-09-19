import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://tasty-kitchen-backend-1.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(`Server ${err}. Try again later.`);
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-container">
          <h1 className="register-title">Tasty Kitchens</h1>
          <h2 className="register-subtitle">Register</h2>
          {error && <p className="register-error">{error}</p>}
          <form onSubmit={handleSubmit} className="register-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="register-button">Register</button>
          </form>

          <a href="https://tasty-kitchen-backend-1.onrender.com/api/auth/google" className="google-login">
            Signup with Google
          </a>

          <p className="register-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="register-right"></div>
    </div>
  );
}

export default Register;
