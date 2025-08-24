import React, { useState } from "react";

export default function SearchBar({ onSearch, darkMode }) {
  const [q, setQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (q.trim()) onSearch(q.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search songs or artists…"
        className={`flex-1 p-3 rounded outline-none placeholder-gray-400 transition-colors duration-300
          ${
            darkMode
              ? "bg-white/5 text-white"
              : "bg-gray-300 text-gray-800 focus:bg-gray-200"
          }
        `}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500 text-white">
        Search
      </button>
    </form>
  );
}
