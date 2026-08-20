// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();

  // while firebase initializes, don't redirect (avoids flicker)
  if (initializing) return null; // or return a spinner component

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
