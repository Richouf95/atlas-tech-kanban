import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function UserSessionProvider({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default UserSessionProvider;
