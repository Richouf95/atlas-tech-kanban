"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react";
import { LiveList } from "@liveblocks/client";
import React from "react";
import BoardContainer from "./BoardContainer";
import { LiveblocksProvider } from "@/app/liveblocks.config";
import { Room } from "@/app/Room";

function Borad({ id, name }: { id: string; name: string }) {
  return (
    <div>
      <h1 className="text-2xl">Board: {name}</h1>
      <Room id={id}>
        <BoardContainer />
      </Room>
    </div>
  );
}

export default Borad;
