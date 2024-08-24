"use client";

import { ReactNode } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";
import { LiveblocksProvider } from "./liveblocks.config";

export function Room({ id, children }: { id: string; children: ReactNode }) {
  return (
    <LiveblocksProvider>
      <RoomProvider
        id={id}
        initialPresence={{}}
        initialStorage={{ columns: new LiveList([]) }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
