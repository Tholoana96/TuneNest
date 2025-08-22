import React, { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
} from "react-icons/fa";

export default function AudioPlayer({ audioRef, track }) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () =>
      setProgress(audio.currentTime / (audio.duration || 1));
    audio.addEventListener("timeupdate", onTimeUpdate);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef, track]);

  if (!track) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
  };

  const rewind = () => {
    if (audioRef.current) audioRef.current.currentTime -= 5;
  };

  const forward = () => {
    if (audioRef.current) audioRef.current.currentTime += 5;
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 md:w-3/4 bg-white/10 backdrop-blur-md p-3 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-3">
      <img src={track.album.cover_small} className="w-12 h-12 rounded" alt="" />
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="font-semibold">{track.title}</div>
          <div className="text-sm opacity-70">{track.artist.name}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={rewind}
            className="p-2 bg-indigo-600 rounded hover:bg-indigo-500">
            <FaBackward />
          </button>
          <button
            onClick={togglePlay}
            className="p-2 bg-indigo-600 rounded hover:bg-indigo-500">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={forward}
            className="p-2 bg-indigo-600 rounded hover:bg-indigo-500">
            <FaForward />
          </button>
          <div className="flex items-center gap-1">
            <FaVolumeUp />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 sm:mt-0 h-2 bg-white/10 rounded overflow-hidden w-full">
        <div
          className="h-full bg-indigo-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
