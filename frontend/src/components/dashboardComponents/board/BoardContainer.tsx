"use client";

import React, { useEffect, useCallback } from "react";
import { ReactSortable } from "react-sortablejs";
import BoardColumn from "./BoardColumn";
import NewBoardColumnForm from "@/components/forms/boardForms/NewBoardColumnForm";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";
import { Column } from "@/types";
import SpinnerBlock from "@/components/SpinnerBlock";
import SpinnerAddColumns from "@/components/SpinnerAddColumns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getAllColumns, updateColumnOrder } from "@/lib/columnsActions";
import { setColumns } from "@/store/reducers/columns/columnsSlice";
import { getAllLabels } from "@/lib/labelsActions";
import { setLables } from "@/store/reducers/labels/labelsSlice";

function BoardContainer({ filterParams }: { filterParams: any }) {
  const board = useSelector((state: RootState) => state.board.board);
  const columns = useSelector((state: RootState) => state.columns.columns);
  const dispatch = useDispatch();
  // const columns: any = [];
  // const columns = useStorage(
  //   (root) => root.columns.map((col) => ({ ...col })),
  //   shallow
  // );

  const fetchColumnsAndLabels = useCallback(async () => {
    if (!board?._id) return;
    const columns = await getAllColumns(board._id);
    const labels = await getAllLabels(board._id);
    dispatch(setColumns(columns));
    dispatch(setLables(labels || []));
  }, [board, dispatch]);

  useEffect(() => {
    fetchColumnsAndLabels();
  }, [fetchColumnsAndLabels]);

  // const updateColum = useMutation(
  //   ({ storage }, columns: LiveObject<Column>[]) => {
  //     storage.set("columns", new LiveList(columns));
  //   },
  //   []
  // );

  const setColumnOrder = async (cols: Column[]) => {
    const newColumns: Column[] = cols.map((col, newIndex) => ({
      ...col,
      index: newIndex,
    }));

    console.log(newColumns);

    try {
      const updatePromises = newColumns.map((col) =>
        updateColumnOrder(col._id, col.index)
      );
      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des colonnes :", error);
    }

    dispatch(setColumns(newColumns));
  };

  if (!columns) {
    return (
      <div className="flex overflow-x-auto space-x-4">
        <SpinnerBlock />
        <SpinnerAddColumns />
      </div>
    );
  }

  const cols = columns
    .map((element) => ({
      ...element,
      id: element._id,
    }))
    .sort((a, b) => a.index - b.index);

  const filteredColumns =
    cols.length > 0 &&
    cols.filter((column: any) => {
      // Filtrer par ID de colonne
      if (
        filterParams.selectedColumns.length > 0 &&
        !filterParams.selectedColumns.includes(column.id)
      ) {
        return false;
      }

      return true;
    });

  return (
    <div className="flex overflow-x-auto space-x-4" aria-label="board coloumns">
      {filteredColumns && (
        <ReactSortable
          group={"columns"}
          list={filteredColumns}
          setList={(filteredColumns) => setColumnOrder(filteredColumns)}
          className="flex gap-5 mx-5 space-x-4"
          handle=".uniquement"
        >
          {filteredColumns.map((col: any) => (
            <div
              key={col._id}
              className="flex-shrink-0"
              tabIndex={0}
              aria-label={`Column ${col.name}`}
              role="region"
            >
              <BoardColumn
                {...col}
                filterParams={filterParams}
                boardId={board?._id}
              />
            </div>
          ))}
        </ReactSortable>
      )}
      <div className="min-w-64 flex-shrink-0">
        <NewBoardColumnForm boardId={board?._id as string} columns={columns} />
      </div>
    </div>
  );
}

export default BoardContainer;
