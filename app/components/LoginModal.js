"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Authentication/Firebase";
import { useRouter } from "next/navigation";

const getFirebaseError = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "User does not exist.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/too-many-requests":
      return "Too many login attempts. Try again later.";
    default:
      return "Login failed. Please try again.";
  }
};

function LoginModal({ closeModal, openSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // This hook will be used for redirecting

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeModal();
        
      router.push('/HomePage');
     
       // Redirect to profile page on successful login
    } catch (err) {
      setError(getFirebaseError(err.code)); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
      <div className="relative bg-[#0a0a0a] p-8 rounded-xl shadow-lg border border-gray-700 w-96">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl"
          disabled={loading}
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Log In
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-900 text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:from-green-300 hover:to-yellow-300 transition-all disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <button
            className="text-green-400 hover:text-green-300"
            onClick={openSignup}
            disabled={loading}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
