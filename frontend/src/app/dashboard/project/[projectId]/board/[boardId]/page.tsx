import React from "react";
import { getUserEmail } from "@/lib/userClient";
import { liveblocksClient } from "@/lib/liveblocksClient";
import Borad from "@/components/dashboardComponents/board/Borad";
import { Room } from "@/app/Room";

async function ProjectBoardPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const boardId = params.boardId;
  const userEmail = await getUserEmail();
  const thisBoard = await liveblocksClient.getRoom(boardId);
  const thisBoardUserAccess = thisBoard.usersAccesses?.[userEmail];
  const thisUserHasAccess =
    thisBoardUserAccess && [...thisBoardUserAccess].includes("room:write");
  if (!thisUserHasAccess) {
    return <div>Access denied</div>;
  }

  const { id, ...rest } = thisBoard;

  return (
    <>
      <Room id={boardId}>
        {thisBoard && (
          <Borad id={boardId} name={thisBoard.metadata.boardName.toString()}  {...rest} />
        )}
      </Room>
    </>
  );
}

export default ProjectBoardPage;
