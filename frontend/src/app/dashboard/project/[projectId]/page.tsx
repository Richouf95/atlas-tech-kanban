import BoardsList from "@/components/dashboardComponents/board/BoardsList";
import ProjectBoards from "@/components/dashboardComponents/board/ProjectBoards";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getProject } from "@/lib/projectActions";
import { getUserEmail } from "@/lib/userClient";
import { RootState } from "@/store/store";
import { Board } from "@/types/Board";
import React from "react";
import { useSelector } from "react-redux";

async function ProjectPage({
  params,
}: {
  params: {
    projectId: string;
  };
}) {
  const { projectId } = params;
  const project = await getProject(projectId);
  



  // const boards = useSelector((state: RootState) => state.board.board);
  // const thisProjectBoards =
  // const thisProjectBoards = boards?.filter(p => p._id === projectId);

  // const userEmail = await getUserEmail();
  // const { data: rooms } = await liveblocksClient.getRooms();

  // // Filter rooms to get those that match the projectId
  // const thisRoomBoards = rooms.filter(
  //   (room) => room.metadata.projectId === projectId
  // );

  // // Sort the boards by createdAt date (oldest first)
  // thisRoomBoards.sort(
  //   (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  // );

  // // Separate the first created board from the rest
  // const [firstBoard, ...otherBoards] = thisRoomBoards;

  return (
    <>
      <h1 className="text-2xl font-bold mt-4 ml-4 uppercase">
        Project : {project && project.name}
      </h1>
      <div className="p-5">
        <ProjectBoards projectId={projectId} />
      </div>
    </>
  );
}

export default ProjectPage;
