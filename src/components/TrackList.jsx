import React from "react";
import TrackCard from "./TrackCard";

export default function TrackList({ tracks, onPlay, currentId, darkMode }) {
  if (!tracks?.length)
    return (
      <div className="mt-6">No results yet. Try searching for an artist.</div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {tracks.map((t) => (
        <TrackCard
          key={t.id}
          track={t}
          onPlay={onPlay}
          isPlaying={currentId === t.id}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}
