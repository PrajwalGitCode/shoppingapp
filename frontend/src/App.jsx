import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import ProductManager from "./products/ProductManager";
import AllProducts from "./products/AllProducts"; 
import CheckoutPage from "./pages/CheckoutPage";
import { setAuthToken } from "./api";

// ✅ Reusable protected route
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [loading, setLoading] = useState(true); // ✅ new

  // ✅ Load saved token/user
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setAuthToken(savedToken);
    }
    setLoading(false);
  }, []);

  // ✅ Global theme toggle
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // ✅ Auth Handlers
  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthToken(authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Navbar
            user={user}
            onLogout={handleLogout}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <main className="flex-1">
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />

              {/* Auth Routes */}
              <Route
                path="/login"
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Login
                      onLogin={handleLogin}
                      onSwitchToSignup={() =>
                        (window.location.href = "/signup")
                      }
                    />
                  )
                }
              />

              <Route
                path="/signup"
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Signup
                      onSignup={handleLogin}
                      onSwitchToLogin={() =>
                        (window.location.href = "/login")
                      }
                    />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute user={user}>
                    <LandingPage user={user} />
                  </PrivateRoute>
                }
              />

              <Route
                path="/products/manage"
                element={
                  <PrivateRoute user={user}>
                    <ProductManager user={user} token={token} />
                  </PrivateRoute>
                }
              />

              <Route
                path="/products"
                element={
                  <PrivateRoute user={user}>
                    <AllProducts user={user} />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/checkout"
                element={<CheckoutPage user={user} token={token} />}
              />

              <Route
                path="/cart"
                element={<CartPage user={user} token={token} />}
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </div>
  );
}
