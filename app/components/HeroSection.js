"use client";
import React, { useState } from "react";
import SignupModal from "./SignupModal";
import { motion } from "framer-motion";

function HeroSection() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white bg-black px-10">
      {/* Background Gradient and Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-400 opacity-30 blur-2xl"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl text-center">
        {/* Heading with animation */}
        <motion.h1
          className="text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Together <br /> Empowering Web3
        </motion.h1>

        {/* Subheading with animation */}
        <motion.p
          className="text-lg text-gray-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Believe in the power of{" "}
          <span className="text-green-400 font-semibold">Decentralized</span>{" "}
          collaboration. <br />
          We <span className="text-yellow-400 font-semibold">Grow</span>{" "}
          together and <span className="text-blue-400 font-semibold">Beyond</span> the next level.
        </motion.p>

        {/* Get Started button */}
        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => setShowSignupModal(true)}
            className="px-5 py-3 text-lg font-semibold text-black bg-gradient-to-r from-green-400 to-yellow-400 rounded-md hover:from-green-300 hover:to-yellow-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <SignupModal
          closeModal={() => setShowSignupModal(false)}
          openLogin={() => {
            // Optional: if you want to support login modal here later
            console.log("Switch to login");
          }}
        />
      )}
    </section>
  );
}

export default HeroSection;
