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
    <div>
      {columns && (
        <ReactSortable
          group={"columns"}
          list={columns}
          setList={setColumnOrder}
        >
          {columns.length > 0 &&
            columns.map((col) => (
              <div>
                <BoardColumn key={col.id} {...col} />
              </div>
            ))}
        </ReactSortable>
      )}
      {/* <ReactSortable<ItemInterface>
        list={columnsList}
        setList={handleSortEnd}
        group={"Columns"}
        className="flex"
        handle=".drag-handle" // Ajout de handle ici
      >
        {columns && columns?.length > 0 && columns.map((column) => (
          <div>
            <BoardColumn key={column.id} />
          </div>
        ))}
      </ReactSortable> */}
      <div>
        <NewBoardColumnForm />
      </div>
    </div>
  );
}

export default BoardContainer;
