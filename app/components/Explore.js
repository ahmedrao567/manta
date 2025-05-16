import React, { useState } from "react";
import { db } from "../Authentication/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";


const Explore = () => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setUserData(null);
    setPosts([]);

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No user found with this email.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const user = userDoc.data();
      setUserData(user);

      const postsRef = collection(db, "posts");
      const postsQuery = query(postsRef, where("uid", "==", userDoc.id), orderBy("timestamp", "desc"));
      const postsSnap = await getDocs(postsQuery);

      const fetchedPosts = postsSnap.docs.map(doc => doc.data());
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Error searching user:", err);
      setError("Something went wrong while searching.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      {/* Search bar */}
      <div className="mb-6 space-y-2">
        <input
          type="email"
          placeholder="Search user by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* User Profile Info */}
      {userData && (
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
          <h1 className="text-3xl font-bold mb-2">{userData.name || "Unnamed User"}</h1>
          <p className="text-gray-400 mb-2">{userData.bio || "No bio provided."}</p>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      )}

      {/* Posts */}
      {posts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <div className="space-y-4">
            {posts.map((p, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow"
              >
                <p>{p.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {p.timestamp?.toDate
                    ? p.timestamp.toDate().toLocaleString()
                    : "Just now"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
