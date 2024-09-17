"use server";

import { getServerSession } from "next-auth";
import uniqid from "uniqid";
import { authOptions } from "./authOptions";
import { liveblocksClient } from "./liveblocksClient";
import { RoomData } from "@liveblocks/node";
import { Board } from "@/types/Board";

export async function createBoard(name: string, projectId?: string) {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email as string;
  const currentUserName = session?.user?.name;

  const newBoard = {
    boardName: name,
    ownerName: currentUserName,
    ownerEmail: email,
    ...(projectId && { projectId }),
    usersAccesses: {
      [email]: ["room:write"],
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/board/create-board`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBoard),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to Create boards");
    }

    const data: Board = await response.json();

    // TODO
    // await liveblocksClient.createRoom(data._id, {
    //   defaultAccesses: [],
    //   usersAccesses: {
    //     [email]: ["room:write"],
    //   },
    //   metadata: {
    //     boardName: name,
    //   },
    // });

    return data;
  } catch (error: any) {
    console.error("Error while creating Board", error.message);
  }
}

export async function getAllBoards() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/board/all-boards`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch boards");
  }

  const data: Board[] = await response.json();
  return data;
}

export async function getBoard(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/board/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch board");
  }

  const data: Board = await response.json();
  return data;
}

export async function updateBoardName(id: string, updateData: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/board/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update board name");
  }

  const data: Board = await response.json();
  return data;
}

export async function updateBoardDescription(id: string, updateData: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/board/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update board description");
  }

  const data: Board = await response.json();
  return data;
}

export async function newCollaboratorOnBoard(
  id: string,
  newCollaboratorList: any
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/board/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usersAccesses: newCollaboratorList }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add new collaborator");
  }

  const data: Board = await response.json();
  return data;
}

export async function removeCollaboratorOnBoard(
  id: string,
  newCollaboratorList: any
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/board/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usersAccesses: newCollaboratorList }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove collaborator");
  }

  const data: Board = await response.json();
  return data;
}

export async function deleteBoard(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/board/${id}`,
    { method: "DELETE" }
  );

  if (!response.ok) {
    throw new Error("Failed to delete board");
  }
  
  // TODO
  // await liveblocksClient.deleteRoom(id);
  // return true;
}
