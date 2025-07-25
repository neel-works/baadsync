import axios from "axios";
import { Track } from "@/types/track";

export interface CreateTrackPayload extends Omit<Track, "id"> {}

export async function createTrack(payload: CreateTrackPayload): Promise<Track> {
  const response = await axios.post<Track>("/api/track", payload);
  return response.data;
}
