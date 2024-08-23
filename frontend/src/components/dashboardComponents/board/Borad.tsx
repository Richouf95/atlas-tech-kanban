"use client";

import React from "react";
import NewBoardColumnForm from "@/components/forms/boardForms/NewBoardColumnForm";
import BoardContainer from "./BoardContainer";
import { shallow, useRoom, useStorage } from "@liveblocks/react/suspense";
import { Column } from "@/app/liveblocks.config";

function Borad() {
  // const room = useRoom();

  // console.log(room);

  // const columns = useStorage(
  //   (root) => root.columns.map((c) => ({ ...c })),
  //   shallow
  // );

  return (
    <div className="mb-20 p-5 flex mr-10">
      <div>
        <BoardContainer />
      </div>
      <div className="min-w-64 max-w-64 mx-5 pr-5 border">
        <NewBoardColumnForm />
      </div>
    </div>
  );
}

export default Borad;
