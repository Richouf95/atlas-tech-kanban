import Borad from "@/components/dashboardComponents/board/Borad";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
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
  const thisBoard = await liveblocksClient.getRoom(boardId);
  const thisBoardUserAccess = thisBoard.usersAccesses?.[userEmail];
  const thisUserHasAccess =
    thisBoardUserAccess && [...thisBoardUserAccess].includes("room:write");

  if (!thisUserHasAccess) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <div className="mb-10">
        Board Page boardId: {boardId} <br />
        user email : {userEmail}
      </div>
      {thisBoard && (
        <Borad id={boardId} name={thisBoard.metadata.boardName.toString()} />
      )}
    </div>
  );
}

export default BoardPage;
