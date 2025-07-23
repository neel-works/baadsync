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
  const userId = session?.user?.id;

  if (!session?.user?.email) {
    throw new Error("User is not authenticated");
  }

  try {
    const beat = await prisma.beat.create({
      data: {
        user: {
          connect: {
            email: session?.user?.email || "",
          },
        },
        // userId: data.userId || session.user.id,
        userId,
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

export async function getAllBeats(userId: string) {
  try {
    const beats = await prisma.beat.findMany({
      where: {
        userId,
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
