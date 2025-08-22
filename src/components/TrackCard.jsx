import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function TrackCard({ track, onPlay, isPlaying, darkMode }) {
  const { title, artist, album } = track;

  return (
    <div
      className={`p-4 flex items-center gap-4 w-full rounded-xl transition-transform duration-300 transform hover:scale-105
        ${
          darkMode
            ? "bg-white/10 backdrop-blur-md border border-white/20"
            : "bg-white/60"
        }`}>
      <img
        src={album.cover_medium}
        alt={title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm opacity-70">{artist.name}</div>
      </div>
      <button
        onClick={() => onPlay(track)}
        className="p-3 bg-indigo-600 rounded hover:bg-indigo-500">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}
