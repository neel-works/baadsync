import { createTrack } from "@/lib/controllers/track.controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const track = await createTrack(body);
    return NextResponse.json(track, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating track", error);
    throw new Error("Error creating track");
  }
}
