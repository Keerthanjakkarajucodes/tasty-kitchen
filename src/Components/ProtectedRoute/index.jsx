// src/components/ProtectedRoute.jsx

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);  // null = loading, true/false after check

  useEffect(() => {
    fetch("https://tasty-kitchen-backend-1.onrender.com/api/auth/validate-token", {
      method: "GET",
      credentials: "include", // send cookie
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch(err => {
        console.error("validate-token error:", err);
        setAuth(false);
      });
  }, []);

  if (auth === null) {
    return <div>Loading...</div>; 
  }
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
