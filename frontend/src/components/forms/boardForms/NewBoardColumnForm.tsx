"use client";

import { useMutation, useRoom, useStorage } from "@/app/liveblocks.config";
import { createColumn } from "@/lib/columnsActions";
import { setColumns } from "@/store/reducers/columns/columnsSlice";
import { LiveList } from "@liveblocks/client";
import { LiveObject } from "@liveblocks/core";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

function NewBoardColumnForm({
  boardId,
  columns,
}: {
  boardId: string;
  columns: any;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newColumnName, setNewColumnName] = useState<string>("");

  const dispatch = useDispatch();

  const handleNewBoardColum = async (e: FormEvent) => {
    e.preventDefault();
    const index = columns.length + 1;
    const newColumn = await createColumn(
      newColumnName,
      index,
      boardId,
    );
    const newColumnsList = [...columns, newColumn];
    // dispatch(setColumns(newColumnsList));
    setEditMode(false);
  };
  return (
    <>
      {!editMode && (
        <div className="mr-5">
          <button
            onClick={() => setEditMode(true)}
            className="w-full bg-[#F4F4F4] "
          >
            Add new column
          </button>
        </div>
      )}
      {editMode && (
        <div className="mr-5">
          <form
            onSubmit={handleNewBoardColum}
            className="p-2 rounded-md columnsClass shadow"
          >
            <div className="my-1 w-full">
              <input
                onChange={(e) => setNewColumnName(e.target.value)}
                type="text"
                placeholder="Column name"
                className="w-full text-black"
                autoFocus
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button type="submit" className="flex-1">
                submit
              </button>
              <button
                onClick={() => {
                  setNewColumnName("");
                  setEditMode(false);
                }}
                className="flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default NewBoardColumnForm;
