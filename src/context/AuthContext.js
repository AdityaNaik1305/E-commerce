//src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Will be null when logged out, object when logged in

  // Simulate login
  const login = (email) => {
    // In a real app, you'd verify credentials. Here, we'll just set a user object.
    setUser({ email: email });
  };

  // Simulate logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Create a custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
