"use client";

import { useApp } from "@/hooks/useMongoTiggerApp";
import { setBoard } from "@/store/reducers/board/boardSlice";
import {
  setBoardsList,
  addBoard,
  updateBoardsList,
  removeBoard,
} from "@/store/reducers/boardList/boardListSlice";
import { RootState } from "@/store/store";
import { Board } from "@/types/Board";
import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Realm from "realm-web";

function DashboardChildren({ children, session }: { children: ReactNode; session: any }) {
  const [exempleHeight, setExempleHeight] = useState("0px");
  const dispatch = useDispatch();
  const triggerApp = useApp();
  const boardChangeStreamRef: any = useRef(null);
  const boardList: Board[] = useSelector(
    (state: RootState) => state.boardsList.boardList
  );

  const userEmail = session.user.email;

  useEffect(() => {
    if (!triggerApp) return;

    const login = async () => {
      try {
        await triggerApp.logIn(Realm.Credentials.anonymous());

        const mongodb = triggerApp.currentUser?.mongoClient("Cluster0");

        const boardCollection = mongodb
          ?.db("atlas-tech-db")
          .collection("boards");

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
              thisBoardUserAccess && [...thisBoardUserAccess].includes("room:write");
          
            if (thisUserHasAccess) {
              dispatch(addBoard(newBoard));
            }
            
            console.log("New Board Added:", newBoard);
          }
          if (change.operationType === "update") {
            const updatedBoard = {
              ...change.fullDocument,
              _id: change.documentKey._id.toString(),
            };
            
            dispatch(setBoard(updatedBoard));
            dispatch(updateBoardsList(updatedBoard));
            console.log("Board Updated:", updatedBoard);
          }
          if (change.operationType === "delete") {
            dispatch(removeBoard(change.documentKey._id.toString()));
            console.log("Board Deleted:", change.documentKey._id.toString());
          }
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
      }
    };

    login();
  }, [triggerApp]);

  useEffect(() => {
    const updateHeight = () => {
      const screenHeight = window.innerHeight;
      const div1Height =
        document.querySelector("#DashboardHeader")?.clientHeight || 0;
      const div2Height =
        document.querySelector("#BoardMenu")?.clientHeight || 0;
      const totalHeight = div1Height + div2Height;

      setExempleHeight(`${screenHeight - totalHeight - 5}px`);
    };

    // Initial update
    updateHeight();

    // Update height on window resize
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
  return (
    <div className="flex flex-col flex-1 overflow-hidden" id="hehe">
      <div style={{ height: exempleHeight }} className="overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default DashboardChildren;
