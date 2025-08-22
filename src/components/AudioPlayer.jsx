import React, { useEffect, useState } from "react";

export default function AudioPlayer({ audioRef, track }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime / (a.duration || 1));
    a.addEventListener("timeupdate", onTime);
    return () => a.removeEventListener("timeupdate", onTime);
  }, [audioRef, track]);

  if (!track) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 md:w-3/4 bg-white/10 backdrop-blur-md p-3 rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src={track.album.cover_small}
          className="w-12 h-12 rounded"
          alt=""
        />
        <div className="flex-1">
          <div className="font-semibold">{track.title}</div>
          <div className="text-sm opacity-70">{track.artist.name}</div>
        </div>
        <div className="w-40 text-xs opacity-80">Preview (30s)</div>
      </div>
      <div className="mt-2 h-2 bg-white/10 rounded overflow-hidden">
        <div
          className="h-full bg-indigo-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
