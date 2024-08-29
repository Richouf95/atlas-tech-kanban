import React from "react";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useThreads } from "@/app/liveblocks.config";
import { Card } from "@/types";
import { Composer, Thread } from "@liveblocks/react-ui";
import ThreadProvider from "@/app/ThreadProvider";
import ChatIcon from "@mui/icons-material/Chat";
import DescriptionIcon from "@mui/icons-material/Description";
import CardDescription from "../dashboardComponents/board/CardDescription";
import CardLabel from "../dashboardComponents/board/CardLabel";
import AssignedTo from "../dashboardComponents/board/AssignedTo";
import DueDate from "../dashboardComponents/board/DueDate";
import LabelModal from "./LabelModal";

function CardModalContainer({
  name,
  id,
  index,
  columnId,
  assigned,
  dueDate,
  label,
  description,
}: Card) {
  const [ediCardName, setEditCardName] = React.useState<boolean>(false);
  const [cardNewName, setCardNewName] = React.useState<string>(name);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);

  const { threads } = useThreads({
    query: {
      metadata: {
        cardId: id,
      },
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletCard = useMutation(({ storage }, id) => {
    const cards = storage.get("cards");
    const cardIndex = cards.findIndex((card) => card.toObject().id === id);
    cards.delete(cardIndex);
    handleClose();
  }, []);

  const updateCard = useMutation(({ storage }, cardId, updateData) => {
    const cards = storage.get("cards");
    const index = cards.findIndex((card) => card.toObject().id === cardId);
    const thisCard = storage.get("cards").get(index);
    for (let key in updateData) {
      thisCard?.set(key as keyof Card, updateData[key]);
    }
  }, []);

  const handleRenameCard = async (e: React.FormEvent) => {
    e.preventDefault();
    updateCard(id, { name: cardNewName });
    setEditCardName(false);
    handleClose();
  };

  const cardData = {
    name,
    id,
    index,
    columnId,
    assigned,
    dueDate,
    label,
    description,
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {!ediCardName && (
          <div className="flex justify-between">
            <div>{name}</div>
            <div className="cursor-pointer" onClick={handleClick}>
              <MoreHorizIcon />
            </div>
          </div>
        )}
      </Typography>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 200,
            maxWidth: 250,
          },
        }}
      >
        {!confirmDelete && (
          <div className="shadow-lg">
            <p
              onClick={() => {
                setEditCardName(true);
                handleClose();
              }}
              className="p-2 m-2 rounded-lg cursor-pointer flex justify-between"
            >
              Rename card <EditIcon />
            </p>
            <p
              className="bg-red-300 p-2 m-2 rounded-lg cursor-pointer flex justify-between"
              onClick={() => setConfirmDelete(true)}
            >
              Delete <DeleteIcon />
            </p>
          </div>
        )}
        {confirmDelete && (
          <div className="text-center p-2">
            <p className="font-bold">Confirmation</p>
            <p>Do you want to delete this card?</p>
            <div className="flex justify-center mt-2 gap-2">
              <button
                className="w-full !bg-red-300"
                onClick={() => {
                  handleDeletCard(id);
                  setConfirmDelete(false);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Popover>
      {ediCardName && (
        <form onSubmit={handleRenameCard} className="p-2">
          <div>
            <input
              type="text"
              name="cardName"
              id="cardName"
              value={cardNewName}
              onChange={(e) => setCardNewName(e.target.value)}
              className="w-full text-black"
            />
          </div>
          <div className="flex justify-center mt-2 gap-2">
            <button type="submit" className="w-full">
              Save
            </button>
            <button onClick={() => setEditCardName(false)} className="w-full">
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="flex justify-between items-center">
        <div>
          <LabelModal id={id} label={label} />
        </div>
        <AssignedTo id={id} assigned={assigned} />
      </div>
      <DueDate id={id} dueDate={dueDate} />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <CardDescription id={id} name={name} description={description} />
      </Typography>
      <div>
        <h2 className="font-bold my-2">
          <ChatIcon />
          Comments
        </h2>
        <div className="max-h-72 overflow-y-auto rounded-lg p-0 noScrollBar">
          {threads &&
            threads.map((thread) => (
              <Thread
                key={thread.id}
                thread={thread}
                id={thread.id}
                className="thread"
              />
            ))}
        </div>
        <Composer metadata={{ cardId: id }} className="composer" />
      </div>
    </>
  );
}

export default CardModalContainer;
