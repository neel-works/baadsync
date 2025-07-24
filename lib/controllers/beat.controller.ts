import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../prisma";

export async function createBeat(data: {
  title: string;
  description?: string;
  bpm: number;
  key?: string;
  isPublished: boolean;
  genre?: string;
  userId: string;
}) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    throw new Error("User is not authenticated");
  }

  try {
    const beat = await prisma.beat.create({
      data: {
        user: {
          connect: {
            email: userEmail,
          },
        },
        title: data.title,
        description: data.description || "",
        bpm: data.bpm,
        key: data.key || "",
        isPublished: data.isPublished,
        genre: data.genre || "",
      },
    });

    return beat;
  } catch (error) {
    console.error("Error creating beat:", error);
    throw new Error("Failed to create beat");
  }
}

export async function getAllBeats() {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      throw new Error("Please log in first");
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const beats = await prisma.beat.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: beats };
  } catch (error) {
    console.error("Error fetching beats:", error);
    throw new Error("Failed to fetch beats");
  }
}

export async function getBeatById(beatId: string) {
  try {
    const beat = await prisma.beat.findUnique({
      where: {
        id: beatId,
      },
    });

    if (!beat) {
      throw new Error("Beat not found");
    }

    return beat;
  } catch (error) {
    console.error("Error fetching beat by ID:", error);
    throw new Error("Failed to fetch beat");
  }
}

export async function updateBeat(
  beatId: string,
  data: Partial<{
    title: string;
    description?: string;
    bpm: number;
    key?: string;
    isPublished: boolean;
    genre?: string;
  }>
) {
  try {
    const updatedBeat = await prisma.beat.update({
      where: {
        id: beatId,
      },
      data,
    });

    return updatedBeat;
  } catch (error) {
    console.error("Error updating beat:", error);
    throw new Error("Failed to update beat");
  }
}

export async function deleteBeat(beatId: string) {
  try {
    const deletedBeat = await prisma.beat.delete({
      where: {
        id: beatId,
      },
    });

    return deletedBeat;
  } catch (error) {
    console.error("Error deleting beat:", error);
    throw new Error("Failed to delete beat");
  }
}
