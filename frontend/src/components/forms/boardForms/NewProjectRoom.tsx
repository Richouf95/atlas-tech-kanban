"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { createBoard } from "@/lib/boardActions";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

function NewProjectRoom() {
  const [newProjectRoomName, setNewProjectRoomName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathName = usePathname();

  const projectId = pathName.replace("/dashboard/project/", "");

  const handleNewRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const room = await createBoard(newProjectRoomName, projectId);
    if (room) {
      router.push(`/dashboard/project/${projectId}/board/${room._id}`);
    }
  };
  
  return (
    <form onSubmit={handleNewRoom} className="create">
      <Box sx={{ width: 1 }}>
        <h1 className="text-2xl mb-2 text-center">
          Create new board for project
        </h1>
        <FormControl sx={{ width: 1 }} variant="outlined">
          <TextField
            className="textInputForm"
            label="Board name"
            variant="outlined"
            type="text"
            value={newProjectRoomName}
            onChange={(e) => setNewProjectRoomName(e.target.value)}
          />
        </FormControl>
        <div>
          <button
            type="submit"
            className="w-full mx-auto mt-5"
            onClick={() => setIsLoading(true)}
          >
            {isLoading && <Spinner />} Create
          </button>
        </div>
      </Box>
    </form>
  );
}

export default NewProjectRoom;
