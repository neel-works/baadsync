import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createBeat() {
  const session = await getServerSession(authOptions);
}
