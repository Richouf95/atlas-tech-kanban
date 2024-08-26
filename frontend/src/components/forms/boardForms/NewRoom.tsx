"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { createBoard } from "@/lib/boardActions";
import { useRouter } from "next/navigation";

function NewRoom() {
  const [newRoomName, setNewRoomName] = useState<string>("");
  const router = useRouter();

  const handleNewRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const room = await createBoard(newRoomName, "N/A");
    if (room) {
      router.push(`/dashboard/board/${room.id}`);
    }
  };

  return (
    <form onSubmit={handleNewRoom} className="loginForm">
      <Box sx={{ width: 1 }}>
        <h1 className="text-2xl mb-2 text-center">Create new board</h1>
        <FormControl sx={{ width: 1 }} variant="outlined">
          <TextField
            className="textInputForm"
            label="Board name"
            variant="outlined"
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
        </FormControl>
        <div>
          <button className="w-full mx-auto mt-5" type="submit">
            Create
          </button>
        </div>
      </Box>
    </form>
  );
}

export default NewRoom;
