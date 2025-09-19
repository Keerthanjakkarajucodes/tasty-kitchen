import { Route, Routes } from 'react-router-dom';

import LoginForm from "./Components/LoginForm";
import Register from "./Components/RegisterForm";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import SpecificRestaurantDetails from "./Components/SpecificRestaurantsDetails";
import PaymentSuccess from "./Components/PaymentSuccess";
import Profile from "./Components/Profile";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/restaurant/:id" element={<SpecificRestaurantDetails />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* Catch-all */}
      <Route
        path="*"
        element={
          <NotFound />
        }
      />
    </Routes>
  );
}

export default App;
