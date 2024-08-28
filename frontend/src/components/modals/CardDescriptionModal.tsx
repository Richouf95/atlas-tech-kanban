"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useMediaQuery from "@mui/material/useMediaQuery";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@/app/liveblocks.config";
import { Card } from "@/types";

function CardDescriptionModal({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [open, setOpen] = React.useState(false);
  const [newDescription, setNewDescription] =
    React.useState<string>(description);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isLargeScreen ? 400 : 260,
    p: 2,
    bgcolor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    border: "none",
    outline: "none",
    borderRadius: 5,
  };

  const updateCardDescription = useMutation(
    ({ storage }, cardId, updateData) => {
      const cards = storage.get('cards');
      const index = cards.findIndex(card => card.toObject().id === cardId);
      const thisCard = storage.get('cards').get(index);
      for (let key in updateData) {
        thisCard?.set(key as keyof Card, updateData[key]);
      }
    },
    []
  );

  const handleNewDescription = async (e: React.FormEvent) => {
    e.preventDefault();
    updateCardDescription(id, {description : newDescription})
    handleClose();
  };

  return (
    <>
      <div>
        <h2 className="font-bold my-2">
          <DescriptionIcon /> Description{" "}
          <span className="cursor-pointer" onClick={handleOpen}>
            <EditIcon />
          </span>
        </h2>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 className="text-center font-bold text-lg">{name}</h2>
          <form>
            <h2 className="font-bold my-2">Description</h2>
            <div>
              <textarea
                autoFocus
                name="Description"
                id="Description"
                value={
                  newDescription === "N/A"
                    ? "Describe your task here ..."
                    : newDescription
                }
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full text-black p-2 border-2 rounded-lg"
              />
            </div>
            <div className="flex justify-center gap-2 py-2">
              <button onClick={handleNewDescription} className="w-full">
                Save
              </button>
              <button onClick={handleClose} className="w-full">
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default CardDescriptionModal;
