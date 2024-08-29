"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { createBoard } from "@/lib/boardActions";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import Spinner from "@/components/Spinner";
import { useDispatch } from "react-redux";
import { onRoomCreated } from "@/store/reducers/roomCreated/roomCreatedSlice";

function NewProjectForm() {
  const [newRoomName, setNewRoomName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNewRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProjectId = uniqid("project-");
    const room = await createBoard(newRoomName, newProjectId);
    if (room) {
      dispatch(onRoomCreated());
      router.push(`/dashboard/project/${newProjectId}`);
    }
  };
  return (
    <form onSubmit={handleNewRoom} className="create">
      <Box sx={{ width: 1 }}>
        <h1 className="text-2xl mb-2 text-center">Create new project</h1>
        <FormControl sx={{ width: 1 }} variant="outlined">
          <TextField
            className="textInputForm"
            label="Project name"
            variant="outlined"
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
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

export default NewProjectForm;
