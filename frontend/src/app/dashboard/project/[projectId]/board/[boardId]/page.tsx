import React from "react";
import { getUserEmail } from "@/lib/userClient";
import { liveblocksClient } from "@/lib/liveblocksClient";
import Borad from "@/components/dashboardComponents/board/Borad";
import { Room } from "@/app/Room";
import { getBoard } from "@/lib/boardActions";
import { redirect } from "next/navigation";

async function ProjectBoardPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const boardId = params.boardId;
  const userEmail = await getUserEmail();
  const thisBoard = await getBoard(boardId);
  const thisBoardUserAccess = thisBoard.usersAccesses?.[userEmail];
  const thisUserHasAccess =
    thisBoardUserAccess && [...thisBoardUserAccess].includes("room:write");

  if (!thisUserHasAccess) {
    redirect("/dashboard");
  }

  return (
      <Room id={boardId}>
        {thisBoard && (
          <Borad />
        )}
      </Room>
  );
}

export default ProjectBoardPage;
