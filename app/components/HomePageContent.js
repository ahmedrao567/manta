import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth, db } from "../Authentication/Firebase"; // ✅ Added db
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore"; // ✅ Firestore imports

import ProfilePage from "./ProfilePage";
import NFTMarketplace from "./NFTMarketplace";
import Notifications from "./Notifications";
import Explore from "./Explore";
import StaticHomeFeed from "./StaticHomeFeed";
import Messages from "./Messages"; // ✅ Messages tab

const HomePageContent = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [hasUnread, setHasUnread] = useState(false);
  const router = useRouter();

  // ✅ Unread notification listener
  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "messageNotifications"),
      where("toUID", "==", auth.currentUser.uid),
      where("seen", "==", false)
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setHasUnread(!snap.empty);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white relative">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 text-sm text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 z-10"
      >
        Log Out
      </button>

      {/* Sidebar */}
      <div className="w-64 bg-black p-6 border-r border-gray-800 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-10">BSocial</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("home")}
            className="w-full text-left hover:text-blue-400"
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className="w-full text-left hover:text-blue-400"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("nft-marketplace")}
            className="w-full text-left hover:text-blue-400"
          >
            NFT Marketplace
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className="w-full text-left hover:text-blue-400"
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("explore")}
            className="w-full text-left hover:text-blue-400"
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className="w-full flex items-center justify-between text-left hover:text-blue-400"
          >
            <span>Messages</span>
            {hasUnread && <span className="text-red-500 text-xl">🔴</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "home" && <StaticHomeFeed />}
        {activeTab === "profile" && <ProfilePage />}
        {activeTab === "nft-marketplace" && <NFTMarketplace />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "explore" && <Explore />}
        {activeTab === "messages" && <Messages />}
      </div>
    </div>
  );
};

export default HomePageContent;
