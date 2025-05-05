"use client";
import React, { useState } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { motion } from "framer-motion";

function HeroSection() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white bg-black px-10">
      
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-400 opacity-30 blur-2xl"></div>

      
      <div className="relative z-10 max-w-4xl text-center">
        <motion.h1
          className="text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Together <br /> Empowering Web3
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Believe in the power of <span className="text-green-400 font-semibold">Decentralized</span> collaboration. <br />
          We <span className="text-yellow-400 font-semibold">Grow</span> together and <span className="text-blue-400 font-semibold">Beyond</span> the next level.
        </motion.p>

        
        <div className="flex justify-center mt-6">
          <motion.button
            className="px-5 py-3 text-lg font-semibold text-black bg-gradient-to-r from-green-400 to-yellow-400 rounded-md hover:from-green-300 hover:to-yellow-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSignupModalOpen(true)}
          >
            Get Started
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      {isSignupModalOpen && (
        <SignupModal
          closeModal={() => setIsSignupModalOpen(false)}
          openLogin={() => {
            setIsSignupModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal
          closeModal={() => setIsLoginModalOpen(false)}
          openSignup={() => {
            setIsLoginModalOpen(false);
            setIsSignupModalOpen(true);
          }}
        />
      )}
    </section>
  );
}

export default HeroSection;
