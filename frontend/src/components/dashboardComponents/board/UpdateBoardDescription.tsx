"use client";

import { updateBoardDescription } from "@/lib/boardActions";
import { updateBoard } from "@/store/reducers/board/boardSlice";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

interface UpdateBoardDescriptionProps {
  currentDescription: string;
  id: string;
  setEditDescription: (value: boolean) => void;
}

function UpdateBoardDescription({
  setEditDescription,
  id,
  currentDescription,
}: UpdateBoardDescriptionProps) {
  const [newDescription, setNewDescription] =
    useState<string>(currentDescription);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleNewDescription = async (e: FormEvent) => {
    e.preventDefault();
    const boardUpdated = await updateBoardDescription(id, {
      description: newDescription,
    });
    dispatch(updateBoard(boardUpdated));
    setNewDescription("");
    setEditDescription(false);
  };

  return (
    <form onSubmit={handleNewDescription}>
      <div>
        <textarea
          name="Description"
          id="Description"
          autoFocus
          value={newDescription && newDescription}
          placeholder="Describe your board here ..."
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full text-black p-2 rounded-lg"
        />
      </div>
      <div className="flex justify-center gap-2 py-2">
        <button type="submit" className="w-full">
          Save
        </button>
        <button onClick={() => setEditDescription(false)} className="w-full">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdateBoardDescription;
