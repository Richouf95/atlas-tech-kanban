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

const DashboardMenu = ({ userEmail }: { userEmail: string }) => {
  const dispatch = useDispatch();

  const fetchBoards = async () => {
    try {
      const allBoards = await getAllBoards();
      const filteredBoards = allBoards.filter(
        (board: Board) => board.usersAccesses && board.usersAccesses[userEmail]
      );
      dispatch(setBoard(filteredBoards));
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
    fetchBoards();
    fetchProjects();
  }, []);

  return <DashBoardMenuContent userEmail={userEmail} />;
};

export default DashboardMenu;

// import React from "react";
// import DashBoardMenuContent from "../DashBoardMenuContent";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";

// async function DashboardMenu() {

//   const session = await getServerSession(authOptions);

//   const userEmail = session?.user?.email;

//   return (
//     <DashBoardMenuContent userEmail={userEmail ? userEmail : ""} />
//   );
// }

// export default DashboardMenu;
