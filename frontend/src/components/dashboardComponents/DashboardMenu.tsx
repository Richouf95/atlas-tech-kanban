"use client";

import { liveblocksClient } from "@/lib/liveblocksClient";
import React, { useEffect, useState } from "react";
import { Popover } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SpinnerAddColumns from "../SpinnerAddColumns";
import { Board } from "@/types/Board";
import { Project } from "@/types";
import { getAllProjects } from "@/lib/projectActions";
import { setProjects } from "@/store/reducers/projects/projectSlice";
import { getAllBoards } from "@/lib/boardActions";
import { setBoard } from "@/store/reducers/board/boardSlice";
import DashBoardMenuContent from "../DashBoardMenuContent";
import { setBoardsList } from "@/store/reducers/boardList/boardListSlice";

const DashboardMenu = ({ userEmail }: { userEmail: string }) => {
  const boardList = useSelector(
    (state: RootState) => state.boardsList.boardList
  );
  const projects = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch();

  const fetchBoards = async () => {
    try {
      const allBoards = await getAllBoards();
      const filteredBoards = allBoards.filter(
        (board: Board) => board.usersAccesses && board.usersAccesses[userEmail]
      );
      dispatch(setBoardsList(filteredBoards));
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const allProjects = await getAllProjects();
      if (allProjects) {
        dispatch(setProjects(allProjects));
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    if (!boardList.length) {
      fetchBoards();
    }
    if (!projects.length) {
      fetchProjects();
    }
  }, []);

  return <DashBoardMenuContent userEmail={userEmail} />;
};

export default DashboardMenu;
