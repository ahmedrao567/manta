import React, { useState } from "react";
import { auth } from "../Authentication/Firebase";
import SearchUser from "./SearchUser";
import PrivateChat from "./PrivateChat";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      <h2 className="text-xl font-bold mb-4">Messages</h2>

      {!selectedUser ? (
        <>
          <p className="mb-2">Search for a user by email to start chatting:</p>
          <SearchUser onUserSelect={handleUserSelect} />
        </>
      ) : (
        <div>
          <p className="mb-4">
            Chatting with: <strong>{selectedUser.email}</strong>
          </p>
          {/* 🔜 This is where the private chat UI will go (Step 2) */}
          <PrivateChat otherUser={selectedUser} /> {/* ✅ Load chat */}
        </div>
      )}
    </div>
  );
};

export default Messages;
