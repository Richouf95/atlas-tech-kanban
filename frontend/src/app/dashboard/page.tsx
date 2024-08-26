import React from "react";
import BoardsList from "@/components/dashboardComponents/board/BoardsList";
import NewRoom from "@/components/forms/boardForms/NewRoom";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { RoomData } from "@liveblocks/node";
import ProjectList from "@/components/dashboardComponents/board/ProjectList";

async function DashBoardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userEmail = session.user?.email as string;

  const { data: rooms } = await liveblocksClient.getRooms({
    userId: userEmail,
  });

  const boardsWithoutProject = rooms.filter(x => x.metadata.projectId === "N/A");
  const boardsWithProject = rooms.filter(x => x.metadata.projectId !== "N/A");

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 mt-2 uppercase">Your work space</h1>
      <div>
        <BoardsList roomList={boardsWithoutProject} />
      </div>
      <div>
        <ProjectList roomList={boardsWithProject} />
      </div>
    </div>
  );
}

export default DashBoardPage;
