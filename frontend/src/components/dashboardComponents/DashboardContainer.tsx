"use client";

import React, { useState, useEffect } from "react";
import BoardsList from "@/components/dashboardComponents/board/BoardsList";
import ProjectList from "@/components/dashboardComponents/board/ProjectList";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { Board } from "@/types/Board";
import { getAllBoards } from "@/lib/boardActions";

const DashboardContainer = ({ session }: { session: any }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const userEmail = session.user?.email as string;

  const fetchBoards = async () => {
    try {
      const allBoards = await getAllBoards();
      const filteredBoards = allBoards.filter(
        (board: Board) => board.usersAccesses && board.usersAccesses[userEmail]
      );
      setBoards(filteredBoards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  console.log(boards);

  //   const { data: boards } = await liveblocksClient.getRooms({
  //     userId: userEmail,
  //   });

  const boardsWithoutProject = boards.filter((board) => !board.projectId);
  const boardsWithProject = boards.filter((board) => board.projectId);

  return (
    <>
      <div>
        <BoardsList roomList={boardsWithoutProject} />
      </div>
      <div>
        <ProjectList roomList={boardsWithProject} />
      </div>
    </>
  );
};

export default DashboardContainer;
