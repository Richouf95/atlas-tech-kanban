"use client";

import { liveblocksClient } from "@/lib/liveblocksClient";
import React, { useEffect, useState } from "react";
import { Popover } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SpinnerAddColumns from "./SpinnerAddColumns";
import { Board } from "@/types/Board";
import { Project } from "@/types";

function DashBoardMenuContent({ userEmail }: { userEmail: string }) {
  // const [simpleBoards, setSimpleBoards] = useState<Board[]>([]);
  const [roomsLoaded, setRoomsLoaded] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPopover, setCurrentPopover] = useState<string | null>(null);

  const roomCreated = useSelector((state: RootState) => state.counter);
  const boardList: Board[] = useSelector(
    (state: RootState) => state.boardsList.boardList
  );
  // const boards: Board[] = useSelector((state: RootState) => state.board.board);
  const projects: Project[] = useSelector(
    (state: RootState) => state.projects.projects
  );

  useEffect(() => {
    if (projects && boardList) {
      setRoomsLoaded(true);
    }
  }, [roomCreated]);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    popoverId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentPopover(popoverId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentPopover(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="lg:min-w-64 p-5 lg:mt-10 boardNavBar">
      {/* Titres côte à côte pour écrans < lg */}
      <div className="flex lg:flex-col gap-4">
        <h2>
          <Link href={`/dashboard`} className="cursor-pointer lg:hidden mx-2">
            Dashboard
          </Link>
        </h2>
        <h2
          onClick={(e) => handleClick(e, "boards")}
          className="cursor-pointer lg:hidden mx-2"
        >
          Boards
        </h2>
        <h2
          onClick={(e) => handleClick(e, "projects")}
          className="cursor-pointer lg:hidden mx-2"
        >
          Projects
        </h2>
      </div>

      {/* Popovers pour les éléments */}
      <Popover
        open={open && currentPopover === "boards"}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="p-2 min-w-64">
          {!roomsLoaded && <SpinnerAddColumns />}
          {boardList &&
            boardList.length > 0 &&
            boardList.map((item: any) => (
              <Link
                href={`/dashboard/board/${item._id}`}
                key={item._id}
                className="p-2 rounded-lg m-2 navItem block cursor-pointer boardAndProjectNavItem"
              >
                {item.boardName}
              </Link>
            ))}
          {roomsLoaded && boardList && boardList.length === 0 && (
            <span>No boards yet</span>
          )}
        </div>
      </Popover>

      <Popover
        open={open && currentPopover === "projects"}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="p-2 min-w-64">
          {!roomsLoaded && <SpinnerAddColumns />}
          {projects &&
            projects.length > 0 &&
            projects.map((item: any) => (
              <Link
                href={`#}`}
                // href={`/dashboard/project/${item.metadata.projectId}`}
                key={item._id}
                className="p-2 rounded-lg m-2 navItem block cursor-pointer boardAndProjectNavItem"
              >
                {item.name}
              </Link>
            ))}
          {roomsLoaded && projects && projects.length === 0 && (
            <span>No project yet</span>
          )}
        </div>
      </Popover>

      {/* Contenu pour écrans lg et plus */}
      <div className="hidden lg:block">
        <div className="my-4">
          <Link
            href={`/dashboard`}
            className="p-2 my-2 rounded-lg navItem block cursor-pointer boardAndProjectNavItem"
          >
            Dashboard
          </Link>
          <h2>Boards</h2>
          {!roomsLoaded && <SpinnerAddColumns />}
          {boardList &&
            boardList.length > 0 &&
            boardList.map((item: Board) => (
              <Link
                href={`/dashboard/board/${item._id}`}
                key={item._id}
                className="p-2 rounded-lg m-2 navItem block cursor-pointer boardAndProjectNavItem"
              >
                {item.boardName}
              </Link>
            ))}
          {roomsLoaded && boardList && boardList.length === 0 && (
            <span className="ml-4">No boards yet</span>
          )}
        </div>
        <div className="my-4">
          <h2>Projects</h2>
          {!roomsLoaded && <SpinnerAddColumns />}
          {projects &&
            projects.length > 0 &&
            projects.map((item: any) => (
              <Link
                href={`/dashboard/project/${item._id}`}
                key={item._id}
                className="p-2 rounded-lg m-2 navItem block cursor-pointer boardAndProjectNavItem"
              >
                {item.name}
              </Link>
            ))}
          {roomsLoaded && projects && projects.length === 0 && (
            <span className="ml-4">No project yet</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoardMenuContent;
