import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

export default function AudioPlayer({ audioRef, track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const updateProgress = () =>
      setProgress(audio.currentTime / audio.duration || 0);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value * audioRef.current.duration;
      setProgress(e.target.value);
    }
  };

  const handleVolumeChange = (e) => setVolume(e.target.value);

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/70 backdrop-blur-md text-white p-3 flex flex-col md:flex-row items-center gap-3 z-50">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src={track.album.cover_small}
          alt={track.title}
          className="w-12 h-12 object-cover rounded"
        />
        <div className="overflow-hidden">
          <div className="font-semibold truncate">{track.title}</div>
          <div className="text-sm text-gray-300 truncate">
            {track.artist.name}
          </div>
        </div>
        <button
          onClick={togglePlay}
          className="p-3 bg-indigo-600 rounded hover:bg-indigo-500 ml-2">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      <div className="flex-1 w-full md:ml-6 flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 rounded-lg bg-gray-600 accent-indigo-500 cursor-pointer"
        />
        <div className="flex items-center gap-1">
          <FaVolumeUp />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 rounded-lg bg-gray-600 accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      <audio ref={audioRef} src={track.preview} />
    </div>
  );
}
