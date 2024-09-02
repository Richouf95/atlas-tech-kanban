"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react";
import { LiveList } from "@liveblocks/client";
import React, { FormEvent, useEffect, useState } from "react";
import BoardContainer from "./BoardContainer";
import {
  LiveblocksProvider,
  useUpdateMyPresence,
} from "@/app/liveblocks.config";
import { Room } from "@/app/Room";
import EditIcon from "@mui/icons-material/Edit";
import { deleteBoard, updateBoardName } from "@/lib/boardActions";
import { useRouter } from "next/navigation";
import BoardMenu from "./BoardMenu";

function Borad({
  id,
  name,
  usersAccesses,
  metadata,
}: {
  id: string;
  name: string;
  usersAccesses: any;
  metadata: any;
}) {
  const [editBoarName, setEditBoarName] = useState<boolean>(false);
  const [newBoardName, setNewBoardName] = useState<string>(name);
  const [filterParams, setFilterParams] = useState<any>();
  const updateMyPresence = useUpdateMyPresence();
  const router = useRouter();

  useEffect(() => {
    updateMyPresence({ boardId: id });

    return () => {
      updateMyPresence({ boardId: null });
    };
  }, []);

  const handleBoardNewName = async (e: FormEvent) => {
    e.preventDefault();
    if (newBoardName === "") {
      alert("Name can not be empty !");
    }
    await updateBoardName(id, { metadata: { boardName: newBoardName } });
    setEditBoarName(false);
    router.refresh();
  };

  console.log(filterParams);

  return (
    <div>
      <BoardMenu
        setFilterParams={setFilterParams}
        id={id}
        usersAccesses={usersAccesses}
        metadata={metadata}
      />
      {!editBoarName && (
        <header className="text-2xl p-5 flex gap-2">
          <h1 aria-label={`Board: ${name}`}>
            Board: {name}
            <button
              aria-label="Edit board name"
              className="ml-2 specialBtn"
              style={{ marginBottom: "-5px" }}
              onClick={() => setEditBoarName(true)}
            >
              <EditIcon className="cursor-pointer" />
            </button>
          </h1>
        </header>
      )}
      {editBoarName && (
        <section aria-labelledby="edit-board-name" className="m-5">
          <h2 id="edit-board-name" className="sr-only mt-10">
            Edit Board Name
          </h2>
          <form
            onSubmit={handleBoardNewName}
            className="flex flex-col md:flex-row  m-5 gap-2"
          >
            <div>
              <label htmlFor="boardName" className="sr-only">
                New Board Name
              </label>
              <input
                type="text"
                name="cardName"
                id="cardName"
                autoFocus
                placeholder={name}
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                className="w-full text-black"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="mr-2" aria-label="Save new name">
                Save
              </button>
              <button aria-label="Cancel edit" onClick={() => setEditBoarName(false)}>Cancel</button>
            </div>
          </form>
        </section>
      )}

      <BoardContainer filterParams={filterParams} />
    </div>
  );
}

export default Borad;
