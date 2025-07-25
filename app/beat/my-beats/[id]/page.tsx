"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Beat } from "@/types/beat";
import { fetchBeatById } from "@/lib/actions/beat.actions";
import BeatDetails from "@/component/beat-details";
import AddTrackModal from "@/component/add-track-modal";

function BeatEditorPage() {
  const [beat, setBeat] = useState<Beat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const getBeat = async () => {
      try {
        const data = await fetchBeatById(id as string);
        setBeat(data);
      } catch (err) {
        setError("Failed to fetch beat.");
      } finally {
        setLoading(false);
      }
    };
    getBeat();
  }, [id]);

  return (
    <div>
      <div className="text-xl font-bold mb-4">Beat Details</div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && beat && <BeatDetails beat={beat} />}
      <AddTrackModal beatId={beat?.id as string} />
    </div>
  );
}

export default BeatEditorPage;
