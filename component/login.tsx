"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {session ? (
        <>
          <p className="mb-4">
            {session.user?.name}! you've already logged in.
          </p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
          Sign In
        </button>
      )}
    </main>
  );
}
