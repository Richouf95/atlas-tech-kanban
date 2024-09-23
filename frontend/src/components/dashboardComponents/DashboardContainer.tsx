"use client";

import React from "react";
import BoardsList from "@/components/dashboardComponents/board/BoardsList";
import ProjectList from "@/components/dashboardComponents/board/ProjectList";
import { Board } from "@/types/Board";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Project } from "@/types";

const DashboardContainer = () => {
  const boardList: Board[] = useSelector(
    (state: RootState) => state.boardsList.boardList
  ).filter((board) => !board.projectId);

  const projects: Project[] = useSelector(
    (state: RootState) => state.projects.projects
  );

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
