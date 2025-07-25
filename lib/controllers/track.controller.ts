import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "../prisma";

export async function createTrack(data: {
  type: string;
  audioUrl: string;
  order: number;
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  beatId: string;
}) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    throw new Error("User not authenticated");
  }

  try {
    const track = await prisma.track.create({
      data: {
        beat: { connect: { id: data.beatId } },
        type: data.type,
        audioUrl: data.audioUrl,
        order: data.order,
        pan: data.pan,
        mute: data.mute,
        solo: data.solo,
        volume: data.volume,
      },
    });

    return track;
  } catch (error) {
    console.error(error, "Error creating track");
    throw new Error("Error creating track");
  }
}
