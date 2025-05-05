"use client";
import React from "react";

const dummyPosts = [
  {
    id: 1,
    username: "you",
    content: "This is your post!",
    timestamp: "2025-05-05 10:00 AM",
    imageUrl: "https://via.placeholder.com/400",
  },
  {
    id: 2,
    username: "friend1",
    content: "Hey there! This is a post by your friend.",
    timestamp: "2025-05-04 03:45 PM",
    imageUrl: null,
  },
  {
    id: 3,
    username: "friend2",
    content: "Beautiful sunset today 🌇",
    timestamp: "2025-05-03 07:30 PM",
    imageUrl: "https://via.placeholder.com/400x200",
  },
];

const StaticHomeFeed = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">Your Feed</h2>
      <div className="space-y-6">
        {dummyPosts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-5 rounded-lg text-white shadow-md">
            <div className="mb-2 text-sm text-gray-400 flex justify-between">
              <span>@{post.username}</span>
              <span>{post.timestamp}</span>
            </div>
            <p className="text-lg">{post.content}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                className="mt-4 rounded-md max-h-80 object-cover w-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticHomeFeed;
