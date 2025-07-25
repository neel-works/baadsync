import React from "react";
import { useRouter } from "next/navigation";
import { Beat } from "@/types/beat";

interface BeatListProps {
  beats: Beat[];
}

const BeatList: React.FC<BeatListProps> = ({ beats }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/beat/my-beats/${id}`);
  };

  return (
    <ul>
      {beats.length === 0 ? (
        <li>No beats found.</li>
      ) : (
        beats.map((beat) => (
          <div
            className="block border border-white p-2 m-4 cursor-pointer"
            key={beat.id}
            onClick={() => handleClick(beat.id)}
          >
            <li className="mb-2">
              <strong>{beat.title}</strong> - {beat.bpm} BPM
              <div>
                <span>{beat.genre}</span> | <span>{beat.key}</span>
              </div>
              <div>{beat.description}</div>
            </li>
          </div>
        ))
      )}
    </ul>
  );
};

export default BeatList;
