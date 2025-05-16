import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "../Authentication/Firebase";

const SearchUser = ({ onUserSelect }) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResults([]);

    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", searchEmail)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No user found.");
        return;
      }

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setResults(users);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <form onSubmit={handleSearch} className="mb-4 flex">
        <input
          type="text"
          placeholder="Search user by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="flex-1 px-3 py-2 rounded-l bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded-r text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-400">{error}</p>}

      {results.map((user) => (
        <div
          key={user.uid}
          onClick={() => onUserSelect(user)}
          className="p-2 bg-gray-700 rounded mb-2 cursor-pointer hover:bg-blue-600"
        >
          {user.email}
        </div>
      ))}
    </div>
  );
};

export default SearchUser;
