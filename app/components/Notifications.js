import React, { useEffect, useState } from "react";
import { auth, db } from "../Authentication/Firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";

const Notifications = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messageNotifications"),
      where("toUID", "==", auth.currentUser.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgData);
    });

    return () => unsubscribe();
  }, []);

  const markAsSeen = async (id) => {
    await updateDoc(doc(db, "messageNotifications", id), { seen: true });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Message Notifications</h2>
      {messages.length === 0 ? (
        <p>No new messages.</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded shadow ${
              msg.seen ? "bg-gray-600" : "bg-blue-700"
            } cursor-pointer`}
            onClick={() => markAsSeen(msg.id)}
          >
            <p className="font-semibold">{msg.fromEmail}</p>
            <p className="text-sm mt-1">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
