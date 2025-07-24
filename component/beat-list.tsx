import React from "react";
import { Beat } from "../types/beat";

interface BeatListProps {
  beats: Beat[];
}

const BeatList: React.FC<BeatListProps> = ({ beats }) => (
  <ul>
    {beats.length === 0 ? (
      <li>No beats found.</li>
    ) : (
      beats.map((beat) => (
        <li key={beat.id} className="mb-2">
          <strong>{beat.title}</strong> - {beat.bpm} BPM
          <div>
            <span>{beat.genre}</span> | <span>{beat.key}</span>
          </div>
          <div>{beat.description}</div>
        </li>
      ))
    )}
  </ul>
);

export default BeatList;
