"use client";

import { newCollaboratorOnBoard } from "@/lib/boardActions";
import { newCollaboratorOnProject } from "@/lib/projectActions";
import { updateBoard } from "@/store/reducers/board/boardSlice";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

interface NewCollaboratorProps {
  id: string;
  setAddCollaborator: (value: boolean) => void;
  usersAccesses: any,
  projectId?: string
}

function NewCollaborator({ id, setAddCollaborator, usersAccesses, projectId }: NewCollaboratorProps) {
  const router = useRouter();
  const [collaboratorEmail, setCollaboratorEmail] = useState<string>("");
  const dispatch = useDispatch();

  const newCollaborator = async (e: FormEvent) => {
    e.preventDefault();
    const newCollaboratorList = {...usersAccesses};
    newCollaboratorList[collaboratorEmail] = ["room:write"];
    const boardUpdated = await newCollaboratorOnBoard(id, newCollaboratorList);
    if (projectId) {
      await newCollaboratorOnProject(projectId, newCollaboratorList);
    }
    dispatch(updateBoard(boardUpdated));
    setCollaboratorEmail('');
    setAddCollaborator(false);
  };

  return (
    <>
      <form onSubmit={newCollaborator}>
        <div>
          <input
            type="email"
            name="Collaborator"
            autoFocus
            id="Collaborator"
            placeholder={"Collaborator email ..."}
            onChange={(e) => setCollaboratorEmail(e.target.value)}
            className="w-full text-black"
          />
        </div>
        <div className="flex justify-center gap-2 py-2">
          <button type="submit" className="w-full">
            Add
          </button>
          <button onClick={() => setAddCollaborator(false)} className="w-full">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default NewCollaborator;
