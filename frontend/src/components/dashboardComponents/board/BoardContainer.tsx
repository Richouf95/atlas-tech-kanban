"use client";

import React from "react";
import { ReactSortable } from "react-sortablejs";
import BoardColumn from "./BoardColumn";
import NewBoardColumnForm from "@/components/forms/boardForms/NewBoardColumnForm";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";
import { Column } from "@/types";
import SpinnerBlock from "@/components/SpinnerBlock";
import SpinnerAddColumns from "@/components/SpinnerAddColumns";

function BoardContainer({ filterParams }: { filterParams: any }) {
  const columns = useStorage(
    (root) => root.columns.map((col) => ({ ...col })),
    shallow
  );

  const filteredColumns =
    columns &&
    columns.filter((column) => {
      // Filtrer par ID de colonne
      if (
        filterParams.selectedColumns.length > 0 &&
        !filterParams.selectedColumns.includes(column.id)
      ) {
        return false;
      }

      return true;
    });

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

  if (!columns) {
    return (
      <div className="flex overflow-x-auto space-x-4">
        <SpinnerBlock />
        <SpinnerAddColumns />
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto space-x-4">
      {filteredColumns && (
        <ReactSortable
          group={"columns"}
          list={filteredColumns}
          setList={setColumnOrder}
          className="flex gap-5 mx-5 space-x-4"
          handle=".uniquement"
        >
          {filteredColumns.length > 0 &&
            filteredColumns.map((col) => (
              <div key={col.id} className="flex-shrink-0">
                <BoardColumn {...col} filterParams={filterParams} />
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
