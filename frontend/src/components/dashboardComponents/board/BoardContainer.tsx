"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
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
import {
  addColumn,
  removeColumn,
  setColumns,
  updateColumns,
} from "@/store/reducers/columns/columnsSlice";
import { getAllLabels } from "@/lib/labelsActions";
import { addLabel, setLables } from "@/store/reducers/labels/labelsSlice";
import { useApp } from "@/hooks/useMongoTiggerApp";
import {
  addCard,
  removeCard,
  updateCard,
} from "@/store/reducers/cards/cardsSlice";

function BoardContainer({ filterParams }: { filterParams: any }) {
  const board = useSelector((state: RootState) => state.board.board);
  const columns = useSelector((state: RootState) => state.columns.columns);
  const boardCards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();
  const triggerApp = useApp();
  const columnChangeStreamRef: any = useRef(null);
  const labelChangeStreamRef: any = useRef(null);
  const cardChangeStreamRef: any = useRef(null);
  const [loading, setIsLoading] = useState<boolean>(true);

  // console.log(filterParams)

  // const columns: any = [];
  // const columns = useStorage(
  //   (root) => root.columns.map((col) => ({ ...col })),
  //   shallow
  // );

  const fetchColumnsAndLabels = useCallback(async () => {
    if (!board?._id) return;
    const columnsFetched = await getAllColumns(board._id);
    const labelsFetched = await getAllLabels(board._id);
    dispatch(setColumns(columnsFetched));
    dispatch(setLables(labelsFetched || []));
    setIsLoading(false);
  }, [board, dispatch]);

  useEffect(() => {
    fetchColumnsAndLabels();
  }, [fetchColumnsAndLabels, board?._id]);

  useEffect(() => {
    if (!triggerApp) return;

    const columnsTrigger = async () => {
      try {
        const mongodb = triggerApp.currentUser?.mongoClient("Cluster0");
        const columnsCollection = mongodb
          ?.db("atlas-tech-db")
          .collection("columns");

        columnChangeStreamRef.current = columnsCollection?.watch();
        const labelChangeStream = columnChangeStreamRef.current;

        for await (const change of labelChangeStream) {
          if (change.operationType === "insert") {
            const newColumn = {
              ...change.fullDocument,
              _id: change.documentKey._id.toString(),
            };
            dispatch(addColumn(newColumn));
          }
          if (change.operationType === "update") {
            const updatedColumn = {
              ...change.fullDocument,
              _id: change.documentKey._id.toString(),
            };
            dispatch(updateColumns(updatedColumn));
          }
          if (change.operationType === "delete") {
            dispatch(removeColumn(change.documentKey._id.toString()));
          }
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
      }
    };

    const labelTrigger = async () => {
      try {
        const mongodb = triggerApp.currentUser?.mongoClient("Cluster0");
        const labelCollection = mongodb
          ?.db("atlas-tech-db")
          .collection("labels");

        labelChangeStreamRef.current = labelCollection?.watch();
        const labelChangeStream = labelChangeStreamRef.current;

        for await (const change of labelChangeStream) {
          if (change.operationType === "insert") {
            const newLabel = {
              ...change.fullDocument,
              _id: change.fullDocument._id.toString(),
            };
            dispatch(addLabel(newLabel));
          }
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
      }
    };

    const cardTrigger = async () => {
      try {
        const mongodb = triggerApp.currentUser?.mongoClient("Cluster0");
        const cardCollection = mongodb?.db("atlas-tech-db").collection("cards");

        cardChangeStreamRef.current = cardCollection?.watch();
        const cardChangeStream = cardChangeStreamRef.current;

        for await (const change of cardChangeStream) {
          if (change.operationType === "insert") {
            const newCard = {
              ...change.fullDocument,
              _id: change.fullDocument._id.toString(),
              columnId: change.fullDocument.columnId.toString(),
            };
            dispatch(addCard(newCard));
            console.log(newCard);
          }
          if (change.operationType === "update") {
            const updatedCard = {
              ...change.fullDocument,
              _id: change.fullDocument._id.toString(),
              columnId: change.fullDocument.columnId.toString(),
              ...(change.fullDocument.label && {
                label: change.fullDocument.label.toString(),
              }),
            };
            dispatch(updateCard(updatedCard));
          }
          if (change.operationType === "delete") {
            dispatch(removeCard(change.documentKey._id.toString()));
          }
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
      }
    };

    columnsTrigger();
    labelTrigger();
    cardTrigger();
  }, [triggerApp]);

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

    try {
      const updatePromises = newColumns.map((col) =>
        updateColumnOrder(col._id, col.index)
      );
      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des colonnes :", error);
    }

    // dispatch(setColumns(newColumns));
  };

  const cols = columns
    .map((element: any) => ({
      ...element,
      id: element._id,
    }))
    .sort((a, b) => a.index - b.index);

  const filteredColumns =
    cols.length > 0 &&
    cols.filter((column: any) => {
      // Filtrer par ID de colonne
      if (filterParams)
        if (filterParams.selectedColumns)
          if (
            filterParams.selectedColumns.length > 0 &&
            !filterParams.selectedColumns.includes(column._id)
          ) {
            return false;
          }

      return true;
    });

    
  if (loading) {
    return (
      <div className="flex overflow-x-auto space-x-4">
        <SpinnerBlock />
        <SpinnerAddColumns />
      </div>
    );
  }

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
