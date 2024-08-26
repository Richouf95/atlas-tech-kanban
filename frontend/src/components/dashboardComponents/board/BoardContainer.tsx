"use client";

import React from "react";
import { ReactSortable } from "react-sortablejs";
import BoardColumn from "./BoardColumn";
import NewBoardColumnForm from "@/components/forms/boardForms/NewBoardColumnForm";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";
import { Column } from "@/types";

function BoardContainer() {
  const columns = useStorage(
    (root) => root.columns.map((col) => ({ ...col })),
    shallow
  );

  const updateColum = useMutation(
    ({ storage }, columns: LiveObject<Column>[]) => {
      storage.set("columns", new LiveList(columns));
    },
    []
  );

  const setColumnOrder = (cols: Column[]) => {
    const newColumns: LiveObject<Column>[] = [];

    cols.forEach((col, newIndex) => {
      const sortedCol = { ...col };
      sortedCol.index = newIndex;
      newColumns.push(new LiveObject(sortedCol));
    });

    updateColum(newColumns);
  };

  return (
    <div className="flex overflow-x-auto space-x-4">
        {columns && (
          <ReactSortable
            group={"columns"}
            list={columns}
            setList={setColumnOrder}
            className="flex gap-5 mx-5 space-x-4"
            handle=".uniquement"
          >
            {columns.length > 0 &&
              columns.map((col) => (
                <div key={col.id} className="flex-shrink-0">
                  <BoardColumn {...col} />
                </div>
              ))}
          </ReactSortable>
        )}
        <div className="min-w-64 flex-shrink-0">
          <NewBoardColumnForm />
        </div>
    </div>
  );
}

export default BoardContainer;
