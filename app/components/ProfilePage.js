import React, { useEffect, useState } from "react";
import { auth, db } from "../Authentication/Firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    getDoc(userRef).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setBio(data.bio || "");
      }
    });

    const q = query(
      collection(db, "posts"),
      where("uid", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => doc.data());
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSave = async () => {
    await setDoc(doc(db, "users", user.uid), {
      name,
      bio,
      email: user.email,
      uid: user.uid,  // ✅ Added for search functionality
    });
  };

  const handlePost = async () => {
    if (!post.trim()) return;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const userName = userDoc.exists() ? userDoc.data().name : "Anonymous";

    await addDoc(collection(db, "posts"), {
      uid: user.uid,
      name: userName,
      content: post,
      timestamp: serverTimestamp(),
    });
    setPost("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      {/* Profile Header */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">{name || "Your Name"}</h1>
        <p className="text-gray-400 mb-4">{bio || "Your bio goes here..."}</p>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Update Name"
            className="w-full p-2 bg-gray-700 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Update Bio"
            className="w-full p-2 bg-gray-700 rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Post Form */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-2 bg-gray-700 rounded"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="mt-2 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Post
        </button>
      </div>

      {/* Post Feed */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Posts</h2>
        <div className="space-y-4">
          {posts.map((p, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-4 rounded-xl shadow border border-gray-700"
            >
              <p className="text-blue-400 font-semibold">{p.name}</p>
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
    </div>
  );
};

export default UserProfile;
