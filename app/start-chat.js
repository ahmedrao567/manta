// pages/start-chat.js
import React, { useState } from 'react';
import SearchUser from '../components/SearchUser';
import { useRouter } from 'next/router';
import { db } from '../Authentication/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const StartChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleStartChat = async () => {
    if (!selectedUser) return;

    // Get current user ID
    const currentUserId = 'current-user-id'; // Replace with the logic to get the logged-in user's ID

    // Check if chat already exists
    const q = query(
      collection(db, 'chats'),
      where('users', 'array-contains', currentUserId),
      where('users', 'array-contains', selectedUser.id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const chat = querySnapshot.docs[0].data();
      router.push(`/chat/${chat.id}`); // Redirect to existing chat
    } else {
      // Create a new chat
      const newChatRef = await addDoc(collection(db, 'chats'), {
        users: [currentUserId, selectedUser.id],
        createdAt: new Date(),
      });

      router.push(`/chat/${newChatRef.id}`); // Redirect to new chat
    }
  };

  return (
    <div className="space-y-4">
      <SearchUser onUserSelect={handleUserSelect} />
      {selectedUser && (
        <div>
          <h3 className="text-white">Chatting with: {selectedUser.email}</h3>
          <button 
            onClick={handleStartChat} 
            className="p-2 bg-green-500 text-white rounded-md"
          >
            Start Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default StartChatPage;
