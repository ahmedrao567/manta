import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../Authentication/Firebase";

const PrivateChat = ({ otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser || !otherUser) return;

    const q = query(
      collection(db, "privateMessages"),
      where("participants", "array-contains", currentUser.uid),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (msg) =>
            (msg.from === currentUser.uid && msg.to === otherUser.uid) ||
            (msg.from === otherUser.uid && msg.to === currentUser.uid)
        );
      setMessages(msgs);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [currentUser, otherUser]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, "privateMessages"), {
      text: input,
      from: currentUser.uid,
      to: otherUser.uid,
      participants: [currentUser.uid, otherUser.uid],
      timestamp: serverTimestamp(),
    });

    await addDoc(collection(db, "messageNotifications"), {
  fromUID: currentUser.uid,
  toUID: otherUser.uid,
  fromEmail: currentUser.email,
  message: input,
  timestamp: serverTimestamp(),
  seen: false
});

    setInput("");
  };
  

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg w-fit max-w-md ${
              msg.from === currentUser.uid ? "ml-auto bg-blue-600" : "bg-gray-700"
            }`}
          >
            <p className="text-white">{msg.text}</p>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <form onSubmit={sendMessage} className="flex mt-4 bg-gray-700 p-2 rounded">
        <input
          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-l outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default PrivateChat;
