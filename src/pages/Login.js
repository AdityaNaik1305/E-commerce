//pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
// Don't forget to import axios if you use it, or use the native fetch API

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  // State for handling loading and errors
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Basic Client-Side Validation (Optional, but good practice)
    if (!email || !password) {
      alert("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // 2. Make the POST request to your backend API
      const response = await fetch('http://localhost:5000/login', { // *** ADJUST THE URL TO YOUR BACKEND API ***
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      // 3. Handle the server's response
      if (response.ok && data.success) {
        // Successful login
        console.log("Login successful!");
        login(data.user); // Pass user data (like email) to AuthContext
        navigate("/");
      } else {
        // Failed login (e.g., 401 Unauthorized or server error message)
        const errorMessage = data.message || "Invalid credentials ❌";
        alert(errorMessage);
      }
    } catch (error) {
      // Handle network errors (e.g., server is down)
      console.error("Login Error:", error);
      alert("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>

          {/* ... Rest of the component (Sign Up link) ... */}
        </div>
      </div>
    </>
  );
}