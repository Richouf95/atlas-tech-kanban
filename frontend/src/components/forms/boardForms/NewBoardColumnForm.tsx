"use client";

import { useMutation, useRoom, useStorage } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { LiveObject } from "@liveblocks/core";
import React, { FormEvent, useState } from "react";
import uniqid from "uniqid";

function NewBoardColumnForm() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newColumnName, setNewColumnName] = useState<string>("");

  const addColumn = useMutation(({ storage }, colName) => {
    const columns = storage.get("columns");
    const initialColumn = new LiveList([]);
    const columIndex = !columns ? 0 : columns.length;

    if (!columns) {
      storage.set("columns", initialColumn);
    }

    const columnId = uniqid("column-");
    return storage.get("columns").push(
      new LiveObject({
        name: colName,
        id: columnId,
        index: columIndex,
        projectId: "N/A"
      })
    );
  }, []);
  const storage = useStorage((root) => root.columns);

  const handleNewBoardColum = (e: FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    addColumn(newColumnName);
  };
  return (
    <>
      {!editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="w-full bg-[#F4F4F4]"
        >
          Clique sur moi
        </button>
      )}
      {editMode && (
        <form
          onSubmit={handleNewBoardColum}
          className="p-2 rounded-md bg-[#F4F4F4] shadow"
        >
          <div className="my-1 w-full">
            <input
              onChange={(e) => setNewColumnName(e.target.value)}
              type="text"
              placeholder="écris"
              className="w-full"
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
      )}
    </>
  );
}

export default NewBoardColumnForm;
