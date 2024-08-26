"use client";

import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBoard } from "@/lib/boardActions";
import { useRouter } from "next/navigation";

function DeleteBoardBtn({ id }: { id: string }) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const router = useRouter();
  const handleDeleteBoard = async () => {
    await deleteBoard(id);
    router.push("/");
  };

  return (
    <>
      {!confirmDelete && (
        <div
          onClick={() => setConfirmDelete(true)}
          className="bg-red-300 rounded-lg flex justify-center py-2 cursor-pointer my-2"
        >
          <DeleteIcon /> <span>Delete Board</span>
        </div>
      )}
      {confirmDelete && (
        <div className="text-center mt-2">
          <h3 className="font-bold">Delete Board</h3>
          <span>Are you sure you want to delete this board?</span>
          <div className="flex justify-center gap-2 py-2">
            <button onClick={handleDeleteBoard} className="w-full !bg-red-300">
              Confirm
            </button>
            <button onClick={() => setConfirmDelete(false)} className="w-full">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteBoardBtn;
