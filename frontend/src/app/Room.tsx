"use client";

import { ReactNode, useEffect, useState } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { LiveList } from "@liveblocks/client";
import { LiveblocksProvider } from "@liveblocks/react";
import { UserMeta } from "./liveblocks.config";
import { Card } from "@/types";
import { getBoard } from "@/lib/boardActions";
import { useDispatch } from "react-redux";
import { setBoard } from "@/store/reducers/board/boardSlice";
import { Board } from "@/types/Board";
import { LivBlockCard } from "./liveblocks.config";

export function Room({ id, children }: { id: string; children: ReactNode }) {
  const [roomBoard, setRoomBoard] = useState<Board | null>(null);
  const dispatch = useDispatch();

  const fetchBoard = async (id: string) => {
    const response = await getBoard(id);
    dispatch(setBoard(response));
    setRoomBoard(response);
  };

  useEffect(() => {
    setRoomBoard(null);
    fetchBoard(id);
  }, [id]);

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
          cards: new LiveList<LivBlockCard[]>([]),
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {() => <>{roomBoard ? children : "Hehe"}</>}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
