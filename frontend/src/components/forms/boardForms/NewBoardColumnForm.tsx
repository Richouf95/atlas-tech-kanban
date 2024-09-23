"use client";

import { createColumn } from "@/lib/columnsActions";
import React, { FormEvent, useState } from "react";

function NewBoardColumnForm({
  boardId,
  columns,
}: {
  boardId: string;
  columns: any;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newColumnName, setNewColumnName] = useState<string>("");

  const handleNewBoardColum = async (e: FormEvent) => {
    e.preventDefault();
    const index = columns.length + 1;
    await createColumn(newColumnName, index, boardId);
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
