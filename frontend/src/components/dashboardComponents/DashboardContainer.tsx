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
  const boards: Board[] = useSelector((state: RootState) => state.board.board);
  const projects: Project[] = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch();

  // const fetchBoards = async () => {
  //   try {
  //     const allBoards = await getAllBoards();
  //     const filteredBoards = allBoards.filter(
  //       (board: Board) => board.usersAccesses && board.usersAccesses[userEmail]
  //     );
  //     setBoards(filteredBoards);
  //   } catch (error) {
  //     console.error("Error fetching boards:", error);
  //   }
  // };

  // const fetchProjects = async () => {
  //   try {
  //     const allProjects = await getAllProjects();
  //     if (allProjects) {
  //       dispatch(setProjects(allProjects));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching project:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchBoards();
  //   fetchProjects();
  // }, []);
  
  // const boardsWithoutProject = boards.filter((board) => !board.projectId);
  // const boardsWithProject = boards.filter((board) => board.projectId);

  return (
    <>
      <div>
        <BoardsList roomList={boards} />
      </div>
      <div>
        <ProjectList roomList={projects} />
      </div>
    </>
  );
};

export default DashboardContainer;
