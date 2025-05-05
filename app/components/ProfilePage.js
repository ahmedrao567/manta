"use client";
import React from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const username = "Web3Warrior";
  const bio =
    "Believer in decentralization | NFT Collector | Building the future of the web 🚀";
  const posts = Array.from({ length: 6 }); // Placeholder posts

  return (
    <section className=" bg-black text-white">
      {/* Cover Photo */}
      <div className="relative h-64 w-full bg-gradient-to-r from-green-500 via-blue-500 to-yellow-400 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-6 pt-24">
        {/* Profile Image */}
        <div className="relative -mt-20 flex justify-center">
          <img
            src="/favicon.svg"
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover"
          />
        </div>

        {/* Username + Bio */}
        <div className="text-center mt-12">
          <motion.h2
            className="text-4xl font-extrabold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {username}
          </motion.h2>
          <motion.p
            className="text-gray-400 mt-4 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {bio}
          </motion.p>

          {/* Stats + Edit Button */}
          <div className="mt-6 flex justify-center gap-12 text-lg text-gray-300">
            <div>
              <span className="font-semibold text-white">42</span> Posts
            </div>
            <div>
              <span className="font-semibold text-white">1.2k</span> Followers
            </div>
            <div>
              <span className="font-semibold text-white">180</span> Following
            </div>
          </div>

          <button className="mt-6 px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-green-400 to-yellow-400 rounded-full hover:from-green-300 hover:to-yellow-300 transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-16 max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-semibold text-white mb-6">Posts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((_, index) => (
            <motion.div
              key={index}
              className="relative h-40 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              {/* Placeholder Post */}
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold">
                Post {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db, storage } from '../Authentication/Firebase';
// import {
//   doc, getDoc, updateDoc,
//   collection, addDoc, query, where, getDocs
// } from 'firebase/firestore';
// import {
//   ref, uploadBytes, getDownloadURL
// } from 'firebase/storage';
// import { useRouter } from 'next/navigation';

// const ProfilePage = () => {
//   const [user, loading] = useAuthState(auth);
//   const [profileData, setProfileData] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');
//   const [uploadingPost, setUploadingPost] = useState(false);
//   const [file, setFile] = useState(null);
//   const [coverFile, setCoverFile] = useState(null);
//   const [editingBio, setEditingBio] = useState(false);
//   const [bioText, setBioText] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     if (!user && !loading) {
//       router.push('/login');
//       return;
//     }

//     const fetchUserData = async () => {
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);
//       if (userSnap.exists()) {
//         setProfileData(userSnap.data());
//         setBioText(userSnap.data().description || '');
//       }
//     };

//     const fetchUserPosts = async () => {
//       const q = query(collection(db, 'posts'), where('userId', '==', user.uid));
//       const querySnapshot = await getDocs(q);
//       const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setPosts(postsData);
//     };

//     if (user) {
//       fetchUserData();
//       fetchUserPosts();
//     }
//   }, [user, loading]);

//   const uploadImage = async (file, path, field) => {
//     const imageRef = ref(storage, `${path}/${user.uid}_${Date.now()}`);
//     await uploadBytes(imageRef, file);
//     const url = await getDownloadURL(imageRef);
//     await updateDoc(doc(db, 'users', user.uid), { [field]: url });
//     setProfileData(prev => ({ ...prev, [field]: url }));
//   };

//   const updateBio = async () => {
//     await updateDoc(doc(db, 'users', user.uid), { description: bioText });
//     setProfileData(prev => ({ ...prev, description: bioText }));
//     setEditingBio(false);
//   };

//   const handlePostSubmit = async () => {
//     if (!newPost.trim() || uploadingPost) return;
//     setUploadingPost(true);
    
//     const postData = {
//       userId: user.uid,
//       content: newPost.trim(),
//       createdAt: new Date(),
//       likes: 0,
//       comments: []
//     };
    
//     await addDoc(collection(db, 'posts'), postData);
//     setNewPost('');
//     setUploadingPost(false);
    
//     // Refresh posts
//     const q = query(collection(db, 'posts'), where('userId', '==', user.uid));
//     const querySnapshot = await getDocs(q);
//     setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//   };

//   if (loading || !user || !profileData) return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-12">
//       {/* Cover Section */}
//       <div className="relative h-64 w-full bg-gradient-to-r from-purple-900 to-blue-800">
//         {profileData.coverPhoto ? (
//           <img
//             src={profileData.coverPhoto}
//             alt="Cover"
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-purple-900 to-blue-800"></div>
//         )}
        
//         <div className="absolute bottom-4 right-4">
//           <label className="cursor-pointer bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <input 
//               type="file" 
//               onChange={e => setCoverFile(e.target.files[0])} 
//               className="hidden" 
//               accept="image/*"
//             />
//           </label>
//           {coverFile && (
//             <button
//               className="ml-2 px-4 py-2 bg-blue-600 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
//               onClick={() => uploadImage(coverFile, 'cover_pics', 'coverPhoto')}
//             >
//               Save Cover
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Profile Section */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row -mt-16 relative">
//           {/* Profile Picture */}
//           <div className="relative group">
//             <img
//               src={profileData.profilePicture || '/default-profile.jpg'}
//               alt="Profile"
//               className="h-32 w-32 rounded-full border-4 border-gray-800 object-cover shadow-lg"
//             />
//             <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//               <label className="cursor-pointer">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <input 
//                   type="file" 
//                   onChange={e => setFile(e.target.files[0])} 
//                   className="hidden" 
//                   accept="image/*"
//                 />
//               </label>
//             </div>
//             {file && (
//               <button
//                 className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-green-600 rounded-full text-xs font-medium hover:bg-green-700 transition-colors shadow-md"
//                 onClick={() => uploadImage(file, 'profile_pics', 'profilePicture')}
//               >
//                 Update
//               </button>
//             )}
//           </div>

//           {/* Profile Info */}
//           <div className="md:ml-8 mt-4 md:mt-0 flex-1">
//             <h1 className="text-3xl font-bold text-white">{profileData.username}</h1>
            
//             {editingBio ? (
//               <div className="mt-2">
//                 <textarea
//                   value={bioText}
//                   onChange={(e) => setBioText(e.target.value)}
//                   className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                   rows="3"
//                   maxLength="200"
//                 />
//                 <div className="flex space-x-2 mt-2">
//                   <button
//                     onClick={updateBio}
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingBio(false)}
//                     className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="mt-2">
//                 <p className="text-gray-300">
//                   {profileData.description || "No bio yet. Click edit to add one."}
//                 </p>
//                 <button
//                   onClick={() => setEditingBio(true)}
//                   className="mt-2 flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                   Edit bio
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Stats/Info */}
//           <div className="lg:col-span-1 space-y-4">
//             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
//               <h3 className="text-lg font-semibold text-white mb-4">Profile Stats</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Posts</span>
//                   <span className="text-white font-medium">{posts.length}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Joined</span>
//                   <span className="text-white font-medium">
//                     {new Date(user.metadata.creationTime).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Middle Column - Posts */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Post Creation */}
//             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
//               <div className="flex items-start space-x-3">
//                 <img
//                   src={profileData.profilePicture || '/default-profile.jpg'}
//                   alt="Profile"
//                   className="h-10 w-10 rounded-full object-cover"
//                 />
//                 <div className="flex-1">
//                   <textarea
//                     value={newPost}
//                     onChange={(e) => setNewPost(e.target.value)}
//                     placeholder="What's on your mind?"
//                     className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
//                     rows="3"
//                   />
//                   <div className="flex justify-between items-center mt-3">
//                     <div className="flex space-x-2">
//                       <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                       </button>
//                     </div>
//                     <button
//                       onClick={handlePostSubmit}
//                       disabled={uploadingPost || !newPost.trim()}
//                       className={`px-4 py-2 rounded-lg font-medium transition-colors ${uploadingPost || !newPost.trim() ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
//                     >
//                       {uploadingPost ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Posting...
//                         </span>
//                       ) : 'Post'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Posts List */}
//             <div>
//               <h3 className="text-xl font-semibold text-white mb-4">Your Posts</h3>
              
//               {posts.length > 0 ? (
//                 <div className="space-y-4">
//                   {posts.map((post) => (
//                     <div key={post.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                           <img
//                             src={profileData.profilePicture || '/default-profile.jpg'}
//                             alt="Profile"
//                             className="h-10 w-10 rounded-full object-cover"
//                           />
//                           <div>
//                             <h4 className="font-medium text-white">{profileData.username}</h4>
//                             <p className="text-xs text-gray-400">
//                               {new Date(post.createdAt?.toDate()).toLocaleString()}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-4">
//                         <p className="text-gray-300 whitespace-pre-line">{post.content}</p>
//                       </div>
//                       <div className="mt-4 pt-4 border-t border-gray-700 flex space-x-4">
//                         <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
//                           </svg>
//                           {post.likes || 0}
//                         </button>
//                         <button className="flex items-center text-gray-400 hover:text-green-400 transition-colors">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                           </svg>
//                           {post.comments?.length || 0}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-700/50">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <h3 className="mt-4 text-lg font-medium text-gray-400">No posts yet</h3>
//                   <p className="mt-1 text-gray-500">Share your thoughts with your first post!</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


