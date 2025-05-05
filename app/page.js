"use client";

import React from "react";
import HeroSection from "./components/HeroSection";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Head from "next/head";
import Header from "./components/Header";
import {motion} from "framer-motion";
import Footer from "./components/Footer";
// import ProfilePage from "./ProfilePage";


export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      
      <Footer />
    </div>
  );
}
