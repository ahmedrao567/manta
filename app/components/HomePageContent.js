"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../Authentication/Firebase"; // adjust the path if needed

import ProfilePage from "./ProfilePage";
import NFTMarketplace from "./NFTMarketplace";
import Notifications from "./Notifications";
import Explore from "./Explore";
import StaticHomeFeed from "./StaticHomeFeed"; // Assuming this is the correct path

const HomePageContent = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/"); // Use replace to prevent back navigation
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white relative">
      {/* Logout button positioned at the top-right corner */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-sm text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 z-10"
      >
        Log Out
      </button>

      {/* Sidebar */}
      <div className="w-64 bg-black p-6 border-r border-gray-800 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-10">Web3 Hub</h2>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {["home", "profile", "nft-marketplace", "notifications", "explore"].map(
            (tab) => (
              <button
                key={tab}
                className={`w-full text-left px-4 py-2 rounded-md text-xl transition ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-green-400 to-yellow-400 text-black"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            )
          )}
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
      
        {activeTab === "home" && <StaticHomeFeed />}
        {activeTab === "profile" && <ProfilePage />}
        {activeTab === "nft-marketplace" && <NFTMarketplace />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "explore" && <Explore />}
      </div>
    </div>
  );
};

export default HomePageContent;
