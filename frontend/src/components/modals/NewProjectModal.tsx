"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import NewRoom from "../forms/boardForms/NewRoom";
import NewProjectForm from "../forms/boardForms/NewProjectForm";

function NewProjectModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useSelector((state: RootState) => state.theme.theme);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Utiliser 90% de la largeur de l'écran
    maxWidth: 400, // Limiter la largeur maximale à 400px
    boxShadow: 24,
    p: 4,
    bgcolor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    border: "none",
    outline: "none",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
  };
  return (
    <>
      <div
        className="roomCard w-full h-28 rounded-lg flex items-center px-5 cursor-pointer"
        onClick={handleOpen}
      >
        <span className="text-xl">+ New Project</span>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <NewProjectForm />
        </Box>
      </Modal>
    </>
  );
}

export default NewProjectModal;
