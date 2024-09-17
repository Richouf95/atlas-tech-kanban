import { Room } from "@/app/Room";
import Borad from "@/components/dashboardComponents/board/Borad";
import { getBoard } from "@/lib/boardActions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { redirect, useRouter } from "next/navigation";
import React from "react";

async function BoardPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const boardId = params.boardId;
  const userEmail = await getUserEmail();
  const thisBoard = await getBoard(boardId);
  // const thisBoard = await liveblocksClient.getRoom(boardId);
  const thisBoardUserAccess = thisBoard.usersAccesses?.[userEmail];
  const thisUserHasAccess =
    thisBoardUserAccess && [...thisBoardUserAccess].includes("room:write");

  if (!thisUserHasAccess) {
    redirect("/");
  }

  return <Room id={boardId}>{thisBoard && <Borad />}</Room>;
}

export default BoardPage;
