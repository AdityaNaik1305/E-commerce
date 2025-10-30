import React, { useState } from "react";
// Import the social buttons from the correct file
import { GoogleSignInButton, FacebookSignInButton } from '../components/SocialLoginButtons.js';
// Import the Auth context
import { useAuth } from '../context/AuthContext.js';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    
    try {
      // NOTE: This tries to connect to a backend server
      // Make sure your server is running on http://localhost:5000/signup
      const response = await fetch('http://localhost:5000/signup', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Signup successful!");
        login(data.user || { email }); // Log the user in
        window.location.hash = "/"; // Redirect to home
      } else {
        const errorMessage = data.message || "Signup failed ❌";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </a>
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div className="space-y-3">
            {/* Use the imported components */}
            <GoogleSignInButton />
            <FacebookSignInButton />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>
          
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email-signup" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password-signup" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input id="confirm-password-signup" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Add the default export
export default SignupPage;

