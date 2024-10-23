"use client";

import { SignOut } from "@/actions/Signout";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  async function handleSignout() {
    await SignOut();
  }

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {session.status}
      {session.data?.user?.email}
      {session.data?.user?.name}
      <Button onClick={handleSignout}>Sign Out</Button>
    </main>
  );
}
