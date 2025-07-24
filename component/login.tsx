"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {session ? (
        <>
          <Image
            src={`${session.user?.image}`}
            alt={""}
            height={72}
            width={72}
          />
          <p className="mb-4">
            {session.user?.name}! you've already logged in.
          </p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <div className="flex flex-col">
          <button onClick={() => signIn("github")}>Sign In with GitHub</button>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Sign In with Google
          </button>
        </div>
      )}
    </main>
  );
}
