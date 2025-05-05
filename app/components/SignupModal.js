"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Authentication/Firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
// import { getFirebaseError } from "@/utils/getFirebaseError"; // Uncomment if this function exists

const getFirebaseError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/operation-not-allowed":
        return "Sign up is currently disabled. Try again later.";
      default:
        return "Sign up failed. Please try again.";
    }
  };
  

function SignupModal({ closeModal, openLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        createdAt: new Date().toISOString(),
      });

      closeModal();
      router.refresh();
    } catch (err) {
        setError(getFirebaseError(err.code));
        // console.error("Signup error:", err);
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
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div>
            <label className="block text-gray-400 mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
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
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-400 to-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:from-green-300 hover:to-yellow-300 transition-all disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <button
            className="text-green-400 hover:text-green-300"
            onClick={openLogin}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupModal;
