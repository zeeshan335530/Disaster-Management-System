// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const { user, initializing } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDashboardClick = (e) => {
    if (initializing) {
      e.preventDefault();
      return;
    }
    if (!user) {
      e.preventDefault();
      navigate("/login");
      return;
    }
  };

  const navButtonClass =
    "relative px-6 py-2 font-semibold rounded-lg text-white transition-transform duration-300 hover:scale-110 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-24 py-3 flex justify-between items-center
                 bg-gradient-to-r from-gray-800 to-gray-900 shadow-md"
      role="navigation"
      aria-label="Main Navigation"
      style={{ borderBottom: "none" }} // ensure no white border
    >
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Emergency Hub
        </Link>
      </div>

      <div className="hidden md:flex space-x-4 items-center">
        <Link to="/dashboard" onClick={handleDashboardClick} className={navButtonClass}>
          Dashboard
        </Link>
        <Link to="/module"><button className={navButtonClass}>Module</button></Link>
        <Link to="/feature"><button className={navButtonClass}>Features</button></Link>
        <Link to="/about"><button className={navButtonClass}>About</button></Link>
        <Link to="/contact"><button className={navButtonClass}>Contact Us</button></Link>
      </div>

      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
