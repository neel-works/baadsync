"use server";

import { getBeatById } from "@/lib/controllers/beat.controller";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

async function TracksPage({ params }: Props) {
  const beat = await getBeatById(params.id);

  return (
    <div>
      <h1>{beat.title}</h1>
      <p>{beat.description}</p>

      {beat.tracks.map((track) => (
        <div key={track.id}>
          <div>
            <h2>Track type:- {track.type}</h2>
            <audio>
              <source src={`${track.audioUrl}`} type="audio/*" />
            </audio>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TracksPage;
