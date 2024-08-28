"use client";

import { ReactNode } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";
import { LiveblocksProvider } from "@liveblocks/react";
import { UserMeta } from "./liveblocks.config";

export function Room({ id, children }: { id: string; children: ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const response = await fetch(`/api/users?ids=` + userIds.join(","));
        return await response.json();
      }}
      resolveMentionSuggestions={async ({ text }) => {
        const response = await fetch(`/api/users?search=` + text);
        const users = await response.json();
        return users.map((user: UserMeta) => user.id);
      }}
    >
      <RoomProvider
        id={id}
        initialPresence={{ cardId: null, boardId: null }}
        initialStorage={{
          columns: new LiveList([]),
          cards: new LiveList([]),
          labels: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {() => <>{children}</>}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
