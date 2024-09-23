"use client";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addBoard,
  updateBoardsList,
  removeBoard,
} from "@/store/reducers/boardList/boardListSlice";
import { setBoard } from "@/store/reducers/board/boardSlice";

export const useBoardTrigger = () => {
  const dispatch = useDispatch();
  const boardChangeStreamRef: any = useRef(null);

  const boardTrigger = async (app: any, userEmail: string) => {
    try {
      const mongodb = app.currentUser?.mongoClient("Cluster0");

      const boardCollection = mongodb?.db("atlas-tech-db").collection("boards");

      boardChangeStreamRef.current = boardCollection?.watch();
      const boardChangeStream = boardChangeStreamRef.current;

      for await (const change of boardChangeStream) {
        if (change.operationType === "insert") {
          const newBoard = {
            ...change.fullDocument,
            _id: change.fullDocument._id.toString(),
          };
          const thisBoardUserAccess = change.usersAccesses?.[userEmail];
          const thisUserHasAccess =
            thisBoardUserAccess &&
            [...thisBoardUserAccess].includes("room:write");

          if (thisUserHasAccess) {
            dispatch(addBoard(newBoard));
          }
        }
        if (change.operationType === "update") {
          const updatedBoard = {
            ...change.fullDocument,
            _id: change.documentKey._id.toString(),
          };

          dispatch(setBoard(updatedBoard));
          dispatch(updateBoardsList(updatedBoard));
        }
        if (change.operationType === "delete") {
          dispatch(removeBoard(change.documentKey._id.toString()));
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la connexion à la collection board :",
        error
      );
    }
  };

  return { boardTrigger };
};
