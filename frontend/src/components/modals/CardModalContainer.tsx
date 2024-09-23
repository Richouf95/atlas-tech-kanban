import React, { useCallback } from "react";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useThreads } from "@/app/liveblocks.config";
import { Card } from "@/types";
import { Composer, Thread } from "@liveblocks/react-ui";
import ChatIcon from "@mui/icons-material/Chat";
import CardDescription from "../dashboardComponents/board/CardDescription";
import AssignedTo from "../dashboardComponents/board/AssignedTo";
import DueDate from "../dashboardComponents/board/DueDate";
import LabelModal from "./LabelModal";
import { deleteCard, updateCardName } from "@/lib/cardsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCards } from "@/store/reducers/cards/cardsSlice";

function CardModalContainer({
  name,
  _id,
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
  const cards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();

  const { threads } = useThreads({
    query: {
      metadata: {
        cardId: _id,
      },
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRenameCard = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await updateCardName(_id, cardNewName);
        setEditCardName(false);
        handleClose();
      } catch (error) {
        console.error(
          "Erreur lors de la modification du nom de la card :",
          error
        );
      }
    },
    [cards, dispatch, cardNewName, _id]
  );
  

  const handleDeletCard = useCallback(
    async (id: string) => {
      try {
        await deleteCard(id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la card :", error);
      }
    },
    [cards, dispatch]
  );

  const cardData = {
    name,
    _id,
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
                  handleDeletCard(_id);
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
        <div><LabelModal id={_id} label={label} /></div>
        <AssignedTo id={_id} assigned={assigned} />
      </div>
      <DueDate id={_id} dueDate={dueDate} />
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <CardDescription id={_id} name={name} description={description} />
      </Typography>
      <div>
        <h2 className="font-bold my-2">
          <ChatIcon />
          Comments
        </h2>
        <div
          className="max-h-72 overflow-y-auto rounded-lg p-0 noScrollBar"
          style={{ zIndex: "100" }}
        >
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
        <Composer metadata={{ cardId: _id }} className="composer" />
      </div>
    </>
  );
}

export default CardModalContainer;
