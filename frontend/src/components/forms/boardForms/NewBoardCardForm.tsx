"use client";

import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { createCards } from "@/lib/cardsActions";

function NewBoardCardForm({
  colId,
  boardId,
}: {
  colId: string;
  boardId: string;
}) {
  const [cardName, setCardName] = React.useState<string>("");
  const [newCard, setNewCard] = React.useState<boolean>(false);

  const handleNewCard = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCards(cardName, 555, colId, boardId);
    setCardName("");
    setNewCard(false);
  };

  return (
    <div>
      {!newCard && (
        <div
          className="flex items-center text-lg p-2 rounded-xl cursor-pointer"
          onClick={() => setNewCard(true)}
        >
          <AddIcon />
          <span className="block">Add card</span>
        </div>
      )}

      {newCard && (
        <div className="pb-2">
          <form onSubmit={handleNewCard}>
            <div className="m-2">
              <input
                type="text"
                name="cardName"
                id="cardName"
                placeholder="Card name ..."
                onChange={(e) => setCardName(e.target.value)}
                className="w-full text-black"
              />
            </div>
            <div className="m-2 flex">
              <button className="w-1/2 m-2" type="submit">
                Create
              </button>
              <button className="w-1/2 m-2" onClick={() => setNewCard(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewBoardCardForm;
