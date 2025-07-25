import { Beat } from "@/types/beat";
import React from "react";

interface BeatDetailsProps {
  beat: Beat;
}

const BeatDetails: React.FC<BeatDetailsProps> = ({ beat }) => (
  <div>
    <strong>{beat.title}</strong>
    <p>{beat.description}</p>
    <p>{beat.bpm} BPM</p>
    <p>{beat.genre}</p>
    <p>{beat.key}</p>
    <p>{beat.isPublished ? "Published" : "Unpublished"}</p>
  </div>
);

export default BeatDetails;
