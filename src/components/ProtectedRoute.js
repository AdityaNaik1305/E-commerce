// src/components/ProtectedRoute.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // If the user is not logged in, redirect them to the login page.
    return <Navigate to="/login" />;
  }

  // If the user is logged in, show the page they wanted to access.
  return children;
}
