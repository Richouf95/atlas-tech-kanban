"use client";

import React, { useState, useEffect } from "react";
import BoardsList from "@/components/dashboardComponents/board/BoardsList";
import ProjectList from "@/components/dashboardComponents/board/ProjectList";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { Board } from "@/types/Board";
import { getAllBoards } from "@/lib/boardActions";
import { getAllProjects } from "@/lib/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "@/store/reducers/projects/projectSlice";
import { RootState } from "@/store/store";
import { Project } from "@/types";

const DashboardContainer = ({ session }: { session: any }) => {
  // const [boards, setBoards] = useState<Board[]>([]);
  // const userEmail = session.user?.email as string;
  const boardList: Board[] = useSelector((state: RootState) => state.boardsList.boardList);
  // const boards: Board[] = useSelector((state: RootState) => state.board.board);
  const projects: Project[] = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <BoardsList roomList={boardList} />
      </div>
      <div>
        <ProjectList roomList={projects} />
      </div>
    </>
  );
};

export default DashboardContainer;
