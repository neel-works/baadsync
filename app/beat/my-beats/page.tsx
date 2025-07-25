"use client";

import BeatList from "@/components/beat-list";
import { fetchBeats } from "@/lib/actions/beat.actions";
import { Beat } from "@/types/beat";
import React, { useEffect, useState } from "react";

function MyBeats() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBeats = async () => {
      try {
        const data = await fetchBeats();
        setBeats(data);
      } catch (err) {
        setError("Failed to fetch beats.");
      } finally {
        setLoading(false);
      }
    };
    getBeats();
  }, []);

  return (
    <div>
      <div className="text-xl font-bold mb-4">My Beats</div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && <BeatList beats={beats} />}
    </div>
  );
}

export default MyBeats;
