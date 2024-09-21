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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateBoard } from "@/store/reducers/board/boardSlice";

export type BoardMetatData = {
  boardName: string;
  ownerName: string;
  ownerEmail: string;
  description?: string;
  projectId?: string;
};

export interface BoardProps {
  id: string;
  name: string;
  metadata: BoardMetatData;
  usersAccesses: object;
}

function Borad() {
  const thisBoard = useSelector((state: RootState) => state.board.board);

  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  // const [id] = useState<string>(_id);
  // const [bName, setName] = useState<string>(metadata.boardName);
  // const [metadata] = useState<any>({
  //   boardName,
  //   ownerName,
  //   ownerEmail,
  // });

  if (!thisBoard)
    return (
      <div className="h-screen flex justify-center items-center">
        <svg
          aria-hidden="true"
          role="status"
          className={`inline w-20 h-20 me-3 ${
            theme === "light" ? "text-white" : "text-black"
          } animate-spin`}
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );

  const [editBoarName, setEditBoarName] = useState<boolean>(false);
  const [newBoardName, setNewBoardName] = useState<string>(
    thisBoard?.boardName || ""
  );
  const [filterParams, setFilterParams] = useState<any>();
  const updateMyPresence = useUpdateMyPresence();
  const router = useRouter();

  useEffect(() => {
    updateMyPresence({ boardId: thisBoard._id });

    return () => {
      updateMyPresence({ boardId: null });
    };
  }, [thisBoard._id]);

  const handleBoardNewName = async (e: FormEvent) => {
    e.preventDefault();
    if (newBoardName === "") {
      alert("Name can not be empty !");
    }
    const boardUpdated = await updateBoardName(thisBoard._id, {
      boardName: newBoardName,
    });
    dispatch(updateBoard(boardUpdated));
    setEditBoarName(false);
    router.refresh();
  };

  return (
    <div>
      <BoardMenu setFilterParams={setFilterParams} />
      {!editBoarName && (
        <header className="text-2xl p-5 flex gap-2">
          <h1 aria-label={`Board: ${thisBoard.boardName}`}>
            Board: {thisBoard.boardName}
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
                placeholder={thisBoard.boardName}
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                className="w-full text-black"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="mr-2" aria-label="Save new name">
                Save
              </button>
              <button
                aria-label="Cancel edit"
                onClick={() => setEditBoarName(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <BoardContainer filterParams={filterParams} />
    </div>
  );
}

export default Borad;
