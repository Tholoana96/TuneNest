import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const audioRef = useRef(null);

  const search = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/.netlify/functions/search?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTracks(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const playTrack = (track) => {
    if (current?.id === track.id) {
      if (audioRef.current.paused) audioRef.current.play();
      else audioRef.current.pause();
    } else {
      setCurrent(track);
    }
  };

  useEffect(() => {
    if (current && audioRef.current) {
      audioRef.current.src = current.preview;
      audioRef.current.play().catch(() => {});
    }
  }, [current]);

  return (
    <div
      className={`min-h-screen p-4 ${
        darkMode
          ? "bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white"
          : "bg-gray-200 text-gray-900"
      }`}>
      <div className="w-full">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">TuneNest Music Player</h1>
            <p className="text-sm opacity-80">
              Nestled in sound, powered by you.
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-700/30 hover:bg-gray-700/50">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        <SearchBar onSearch={search} />
        {loading && <div className="mt-6">Loading…</div>}
        {error && <div className="mt-6 text-red-400">{error}</div>}

        <TrackList
          tracks={tracks}
          onPlay={playTrack}
          currentId={current?.id}
          darkMode={darkMode}
        />

        <AudioPlayer audioRef={audioRef} track={current} />
      </div>
    </div>
  );
}
