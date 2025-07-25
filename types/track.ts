export interface Track {
  id: string;
  type: string;
  beatId: string;
  audioUrl: string;
  order: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  volume: number;
}
