// SendMessage.js (in your components folder)
'use client';
import React, { useState } from 'react';
import { db } from '../Authentication/Firebase'; // Firebase setup
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Authentication/Firebase';

const SendMessage = ({ receiverId }) => {
  const [messageText, setMessageText] = useState('');
  const [user] = useAuthState(auth);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (messageText.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        senderId: user.uid,
        receiverId,
        messageText,
        timestamp: serverTimestamp(),
        read: false,
      });
      setMessageText('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSendMessage} className="flex flex-col space-y-2">
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message"
          className="p-2 rounded-md border border-gray-700 text-white bg-gray-800"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
