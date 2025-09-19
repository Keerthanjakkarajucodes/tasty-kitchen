import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://tasty-kitchen-backend-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send/receive cookies
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-container">
          <h1 className="login-title">Tasty Kitchens</h1>
          <h2 className="login-subtitle">Login</h2>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
            <button type="submit" className="login-button">Login</button>
          </form>

          <p className="login-switch">
            Not registered? <Link to="/register">Click here</Link>
          </p>
        </div>
      </div>

      {/* Right side image (handled by CSS) */}
      <div className="login-right"></div>
    </div>
  );
}

export default Login;
