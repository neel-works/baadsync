import { createBeat, getAllBeats } from "@/lib/controllers/beat.controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const beat = await createBeat(body);
    return NextResponse.json(beat, {
      status: 201,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const userId = req.headers.get("user-id");

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  try {
    const beats = await getAllBeats(userId);
    return NextResponse.json(beats, {
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
