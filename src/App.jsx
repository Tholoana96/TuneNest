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

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/.netlify/functions/search?q=top`);
        if (!res.ok) throw new Error("Failed to fetch trending");
        const data = await res.json();
        setTracks(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

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
          : "bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 text-gray-800"
      }`}>
      <div className="w-full max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold">TuneNest Music Player</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{darkMode ? "Dark" : "Light"}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-800 peer-checked:bg-indigo-600"
                    : "bg-gray-400 peer-checked:bg-indigo-600"
                }`}
              />
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </label>
          </div>
        </header>

        {!tracks.length && !loading && !error && (
          <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
            <h2 className="text-4xl font-bold opacity-90">
              Welcome to TuneNest
            </h2>
            <p className="text-lg opacity-70">
              Nestled in sound, powered by you. Search for your favorite artists
              and tracks to get started!
            </p>
            <div className="mt-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
                alt="Music illustration"
                className="w-40 opacity-50 animate-bounce"
              />
            </div>
          </div>
        )}

        <div className="mt-6">
          <SearchBar onSearch={search} />
        </div>

        {loading && <div className="mt-6 text-center">Loading…</div>}
        {error && <div className="mt-6 text-red-400 text-center">{error}</div>}

        {tracks.length > 0 && (
          <TrackList
            tracks={tracks}
            onPlay={playTrack}
            currentId={current?.id}
            darkMode={darkMode}
          />
        )}

        <AudioPlayer audioRef={audioRef} track={current} />
      </div>
    </div>
  );
}
