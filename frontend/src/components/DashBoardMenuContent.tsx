"use client";

import { liveblocksClient } from "@/lib/liveblocksClient";
import React, { useEffect, useState } from "react";
import { Popover } from "@mui/material";
import Link from "next/link";

function DashBoardMenuContent({ userEmail }: { userEmail: string }) {
  const [allRooms, setAllRooms] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPopover, setCurrentPopover] = useState<string | null>(null);

  const fetchRooms = async () => {
    const response = await liveblocksClient.getRooms();
    return response;
  };

  useEffect(() => {
    const getRooms = async () => {
      const rooms = await fetchRooms();
      setAllRooms(rooms.data);
    };

    getRooms();
  }, []);


  const myBoards = allRooms.filter((items: any) =>
    items.usersAccesses.hasOwnProperty(userEmail)
  );

  const boardsWithoutProject = myBoards.filter(
    (x: any) => x.metadata.projectId === "N/A"
  );
  const boardsWithProject = myBoards.filter(
    (x: any) => x.metadata.projectId !== "N/A"
  );

  // Grouper par projectId
  const groupedByProject = boardsWithProject.reduce((acc: any, room: any) => {
    const projectId = room.metadata.projectId;
    if (!acc[projectId]) {
      acc[projectId] = [];
    }
    acc[projectId].push(room);
    return acc;
  }, {});

  // Trier chaque groupe par createdAt
  for (const projectId in groupedByProject) {
    groupedByProject[projectId].sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  // Récupérer le plus ancien élément de chaque groupe
  const projects = Object.values(groupedByProject).map(
    (group: any) => group[0]
  );

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
          {boardsWithoutProject &&
            boardsWithoutProject.length > 0 &&
            boardsWithoutProject.map((item: any) => (
              <Link
                href={`/dashboard/board/${item.id}`}
                key={item.id}
                className="p-2 rounded-lg m-2 navItem block cursor-pointer boardAndProjectNavItem"
              >
                {item.metadata.boardName}
              </Link>
            ))}
          {boardsWithoutProject && boardsWithoutProject.length === 0 && (
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
          {projects &&
            projects.length > 0 &&
            projects.map((item: any) => (
              <Link
                href={`/dashboard/project/${item.metadata.projectId}`}
                key={item.id}
                className="p-2 rounded-lg m-2 navItem block cursor-pointer boardAndProjectNavItem"
              >
                {item.metadata.boardName}
              </Link>
            ))}
          {projects && projects.length === 0 && <span>No project yet</span>}
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
          {boardsWithoutProject &&
            boardsWithoutProject.length > 0 &&
            boardsWithoutProject.map((item: any) => (
              <Link
                href={`/dashboard/board/${item.id}`}
                key={item.id}
                className="p-2 rounded-lg m-2 navItem block cursor-pointer boardAndProjectNavItem"
              >
                {item.metadata.boardName}
              </Link>
            ))}
          {boardsWithoutProject && boardsWithoutProject.length === 0 && (
            <span className="ml-4">No boards yet</span>
          )}
        </div>
        <div className="my-4">
          <h2>Projects</h2>
          {projects &&
            projects.length > 0 &&
            projects.map((item: any) => (
              <Link
                href={`/dashboard/project/${item.metadata.projectId}`}
                key={item.id}
                className="p-2 rounded-lg m-2 navItem block cursor-pointer boardAndProjectNavItem"
              >
                {item.metadata.boardName}
              </Link>
            ))}
          {projects && projects.length === 0 && (
            <span className="ml-4">No project yet</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoardMenuContent;
