"use client";

import { newCollaboratorOnBoard } from "@/lib/boardActions";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

interface NewCollaboratorProps {
  id: string;
  setAddCollaborator: (value: boolean) => void;
}

function NewCollaborator({ id, setAddCollaborator }: NewCollaboratorProps) {
  const router = useRouter();
  const [collaboratorEmail, setCollaboratorEmail] = useState<string>("");

  const newCollaborator = async (e: FormEvent) => {
    e.preventDefault();
    await newCollaboratorOnBoard(id, collaboratorEmail);
    router.refresh();
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
