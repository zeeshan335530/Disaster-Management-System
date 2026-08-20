// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./pages/Home.jsx";
import Module from "./components/Module.jsx";
import Feature from "./components/Feature.jsx";    // <-- correct import for the Feature page
import About from "./components/About.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Contact from "./components/Contact.jsx";
import DisasterDashboard from "./pages/DisasterDashboard.jsx";
import Reports from "./pages/Reports.jsx"; // ✅ new import

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-40">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/module" element={<Module />} />       {/* public */}
      <Route path="/feature" element={<Feature />} />     {/* public */}
      <Route path="/about" element={<About />} />  
      <Route path="/contact" element={<Contact />} />  
      <Route path="/reports" element={<Reports />} />     {/* public */}

      <Route
        path="/dashboard"
        element={user ? <DisasterDashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={!user ? <AuthPage type="login" /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/signup"
        element={!user ? <AuthPage type="signup" /> : <Navigate to="/dashboard" replace />}
      />

      {/* fallback -> go to home (public) instead of forcing login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
