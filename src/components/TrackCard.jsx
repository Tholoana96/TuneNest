import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function TrackCard({ track, onPlay, isPlaying, darkMode }) {
  const { title, artist, album } = track;

  return (
    <div
      className={`w-full grid grid-cols-[80px_1fr_auto] items-center gap-4 py-2 px-1 transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(128,0,255,0.5)]
        ${darkMode ? "bg-transparent" : "bg-white/60"}`}>
      <img
        src={album.cover_medium}
        alt={track.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="overflow-hidden">
        <div
          className={`font-semibold truncate ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
          {title}
        </div>
        <div
          className={`text-sm truncate ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
          {artist.name}
        </div>
      </div>
      <button
        onClick={() => onPlay(track)}
        className="p-3 bg-indigo-600 rounded hover:bg-indigo-500">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}
