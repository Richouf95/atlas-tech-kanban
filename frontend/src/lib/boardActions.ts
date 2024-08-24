"use server"

import { getServerSession } from "next-auth";
import uniqid from "uniqid";
import { authOptions } from "./authOptions";
import { liveblocksClient } from "./liveblocksClient";
import { RoomData } from "@liveblocks/node";

export async function createBoard(name: string): Promise<false | RoomData> {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  if (email) {
    const roomId = uniqid("room-");
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ["room:write"],
      },
      metadata: {
        boardName: name,
      },
    });
  }

  return false;
}
