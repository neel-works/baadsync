import axios from "axios";
import { Beat } from "../../types/beat";

export const fetchBeats = async (): Promise<Beat[]> => {
  const response = await axios.get("/api/beat");
  return response.data.data || [];
};

export const createBeat = async (beatData: Omit<Beat, "id">) => {
  const response = await axios.post("/api/beat", beatData);
  return response.data;
};
