"use client";
import React, { useState } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import Image from "next/image";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center bg-black text-white py-4 px-6 font-sans">
        {/* Logo */}
        <div className="flex items-center space-x-5">
          <div className="w-8 h-8">
            <Image src="/favicon.svg" alt="TaskOn" width={32} height={32} />
          </div>
          <span className="text-lg font-semibold">TaskOn</span>
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6 text-gray-300">
          <a href="../Profile.js" className="hover:text-white">About Us</a>
          <a href="#" className="hover:text-white">Blog</a>
          <a href="#" className="hover:text-white">Docs</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </nav>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            className="border border-white px-4 py-2 rounded-md hover:bg-gray-500"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Log In
          </button>
          <button
            className="bg-gradient-to-r from-green-400 to-yellow-400 px-4 py-2 rounded-md text-black font-semibold hover:from-green-300 hover:to-yellow-300"
            onClick={() => setIsSignupModalOpen(true)}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginModal
          closeModal={() => setIsLoginModalOpen(false)}
          openSignup={() => {
            setIsLoginModalOpen(false);
            setIsSignupModalOpen(true);
          }}
        />
      )}

      {isSignupModalOpen && (
        <SignupModal
          closeModal={() => setIsSignupModalOpen(false)}
          openLogin={() => {
            setIsSignupModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}
    </>
  );
}

export default Header;
