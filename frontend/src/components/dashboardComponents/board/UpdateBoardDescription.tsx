"use client"

import { updateBoardDescription } from "@/lib/boardActions";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

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

    const router = useRouter();

  const handleNewDescription = async (e: FormEvent) => {
    e.preventDefault();
    await updateBoardDescription(id, {
      metadata: { description: newDescription },
    });
    router.refresh();
    setNewDescription("");
    setEditDescription(false)
  };

  return (
    <form>
      <div>
        <textarea
          name="Description"
          id="Description"
          autoFocus
          value={
            newDescription === "N/A"
              ? "Describe your board here ..."
              : newDescription
          }
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full text-black p-2"
        />
      </div>
      <div className="flex justify-center gap-2 py-2">
        <button onClick={handleNewDescription} className="w-full">
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
