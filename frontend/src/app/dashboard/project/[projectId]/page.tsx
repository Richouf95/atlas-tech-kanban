import BoardsList from "@/components/dashboardComponents/board/BoardsList";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import React from "react";

async function ProjectPage({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const { projectId } = params;
  const userEmail = await getUserEmail();
  const { data: rooms } = await liveblocksClient.getRooms();

  // Filter rooms to get those that match the projectId
  const thisRoomBoards = rooms.filter(
    (room) => room.metadata.projectId === projectId
  );

  // Sort the boards by createdAt date (oldest first)
  thisRoomBoards.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Separate the first created board from the rest
  const [firstBoard, ...otherBoards] = thisRoomBoards;

  return (
    <>
      <h1 className="text-2xl font-bold mt-4 ml-4 uppercase">
        Project : {firstBoard.metadata.boardName}
      </h1>
      <div className="p-5">
        <BoardsList roomList={otherBoards} />
      </div>
    </>
  );
}

export default ProjectPage;
