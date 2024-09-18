"use client";

import React from "react";
import BoardsList from "./BoardsList";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Board } from "@/types/Board";

const ProjectBoards = ({ projectId }: { projectId: string }) => {
  const boardList: Board[] = useSelector(
    (state: RootState) => state.boardsList.boardList
  );
  // const board: Board[] = useSelector((state: RootState) => state.board.board);
  // const project = useSelector(
  //   (state: RootState) => state.projects.projects
  // )?.filter((p) => p._id === projectId)[0];
  const thisProjectBoards =
    boardList && boardList.filter((b: Board) => b.projectId === projectId);
  return <BoardsList roomList={thisProjectBoards} />;
};

export default ProjectBoards;
