"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CardModalContainer from "./CardModalContainer";
import useMediaQuery from "@mui/material/useMediaQuery";
import CardLabel from "../dashboardComponents/board/CardLabel";
import { Card } from "@/types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function CardModal({
  name,
  _id,
  index,
  columnId,
  boardId,
  assigned,
  dueDate,
  label,
  description,
}: Card) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [open, setOpen] = React.useState(false);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cardData = {
    name,
    _id,
    index,
    columnId,
    boardId,
    assigned,
    dueDate,
    label,
    description,
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isLargeScreen ? 500 : 360,
    p: 2,
    bgcolor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    border: "none",
    outline: "none",
    borderRadius: 5,
  };

  return (
    <>
      <div
        className="p-5 my-2 rounded-xl columCards cursor-pointer relative"
        onClick={handleOpen}
      >
        <div className="absolute top-2 right-1">
          {/* <CardLabel id={id} label={label} /> */}
        </div>
        <h2 className="my-3">{name}</h2>
        {/* {dueDate !== "N/A" && (
          <p className="">
            <AccessTimeIcon />
            <span className="ml-1">{dueDate}</span>
          </p>
        )} */}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="overflow-y-auto">
            <CardModalContainer {...cardData} />
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CardModal;
