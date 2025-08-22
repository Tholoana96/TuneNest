import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (q.trim()) onSearch(q.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search songs or artists…"
        className="flex-1 p-3 rounded bg-white/5 outline-none placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
        Search
      </button>
    </form>
  );
}
