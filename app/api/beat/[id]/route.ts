import {
  deleteBeat,
  getBeatById,
  updateBeat,
} from "@/lib/controllers/beat.controller";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  try {
    const beat = await getBeatById(params.id);
    return NextResponse.json(beat, {
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();

  try {
    const updatedBeat = await updateBeat(params.id, body);
    return NextResponse.json(updatedBeat, {
      status: 200,
    });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await deleteBeat(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
