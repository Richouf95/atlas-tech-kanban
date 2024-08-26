import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCollaboratorOnBoard } from "@/lib/boardActions";
import { useRouter } from "next/navigation";

interface CollaboaratorsListProps {
  id: string;
  usersAccesses: Record<string, any>; 
}

function CollaboaratorsList({ id, usersAccesses }: CollaboaratorsListProps) {
  
  const [removeCollaborator, setRemoveCollaborator] = useState<
    Record<string, boolean>
  >({});

  const router = useRouter();

  const handleRemoveClick = (email: string) => {
    setRemoveCollaborator((prevState) => ({
      ...prevState,
      [email]: true,
    }));
  };

  const handleCancelClick = (email: string) => {
    setRemoveCollaborator((prevState) => ({
      ...prevState,
      [email]: false,
    }));
  };

  const handleConfirmRemove = async (email: string) => {
    await removeCollaboratorOnBoard(id, email);
    alert(`Removed ${email}`);
    router.refresh();
  };

  return (
    <div className="my-2">
      {usersAccesses &&
        Object.keys(usersAccesses).map((email) => (
          <div key={email}>
            <div className="flex justify-between p-2">
              <p>{email}</p>{" "}
              {!removeCollaborator[email] && (
                <span
                  onClick={() => handleRemoveClick(email)}
                  className="cursor-pointer"
                >
                  <DeleteIcon />
                </span>
              )}
            </div>
            {removeCollaborator[email] && (
              <div className="text-center mt-2">
                <h3 className="font-bold">Remove collaborator</h3>
                <span>Are you sure you want to remove this collaborator?</span>
                <div className="flex justify-center gap-2 py-2">
                  <button
                    onClick={() => handleConfirmRemove(email)}
                    className="w-full !bg-red-300"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleCancelClick(email)}
                    className="w-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default CollaboaratorsList;
