"use server";

import { getServerSession } from "next-auth";
import uniqid from "uniqid";
import { authOptions } from "./authOptions";
import { liveblocksClient } from "./liveblocksClient";
import { RoomData } from "@liveblocks/node";

export async function createBoard(
  name: string,
  projectId: string
): Promise<false | RoomData> {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;
  const currentUserName = session?.user?.name;

  if (email) {
    const roomId = uniqid("room-");
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ["room:write"],
      },
      metadata: {
        boardName: name,
        projectId,
        ownerName: currentUserName || "N/A",
        ownerEmail: email,
        description: "N/A",
      },
    });
  }

  return false;
}

export async function updateBoardName(id: string, updateData: any) {
  await liveblocksClient.updateRoom(id, updateData);
  return true;
}

export async function deleteBoard(id: string) {
  await liveblocksClient.deleteRoom(id);
  return true;
}

export async function newCollaboratorOnBoard(
  id: string,
  collaboratorEMail: string
) {
  const room = await liveblocksClient.getRoom(id);
  const usersAccesses = room.usersAccesses;
  usersAccesses[collaboratorEMail] = ["room:write"];
  await liveblocksClient.updateRoom(id, { usersAccesses });
  return true;
}

export async function removeCollaboratorOnBoard(id: string, email: string) {
  const room = await liveblocksClient.getRoom(id);
  const usersAccesses: any = room.usersAccesses;
  usersAccesses[email] = null;
  await liveblocksClient.updateRoom(id, {usersAccesses});
  return true;
}

export async function updateBoardDescription(id: string, updateData: any) {
  await liveblocksClient.updateRoom(id, updateData);
  return true;
}