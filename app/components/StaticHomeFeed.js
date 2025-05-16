import React, { useEffect, useState } from "react";
import { db } from "../Authentication/Firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // Fetching posts from all users
  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Home Page</h2>

      {/* All Users' Posts */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 p-4 rounded-xl shadow border border-gray-700"
            >
              <p className="font-semibold text-blue-400">
                {post.name || "Unknown User"}
              </p>
              <p>{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {post.timestamp?.toDate
                  ? post.timestamp.toDate().toLocaleString()
                  : "Just now"}
              </p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
