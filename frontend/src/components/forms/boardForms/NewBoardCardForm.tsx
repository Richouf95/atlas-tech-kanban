"use client";

import { useMutation } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { LiveObject } from "@liveblocks/core";
import uniqid from "uniqid";
import AddIcon from "@mui/icons-material/Add";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function NewBoardCardForm({ colId }: { colId: string }) {
  const [cardName, setCardName] = React.useState<string>("");
  const [newCard, setNewCard] = React.useState<boolean>(false);

  const addCard = useMutation(({ storage }, name) => {
    const cards = storage.get("cards");
    const initialCard = new LiveList([]);
    let cardIndex = !cards ? 0 : cards.length;

    if (!cards) {
      storage.set("cards", initialCard);
    }

    const cardId = uniqid("card-");
    return storage.get("cards").push(
      new LiveObject({
        name: name,
        id: cardId,
        columnId: colId,
        index: cardIndex,
        label: "N/A",
        dueDate: "N/A",
        assigned: "N/A",
        description: "N/A"
      })
    );
  }, []);

  const handleNewCard = (e: React.FormEvent) => {
    e.preventDefault();
    addCard(cardName);
    setCardName('');
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
              <button className="w-1/2 m-2" type="submit">Create</button>
              <button className="w-1/2 m-2" onClick={() => setNewCard(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewBoardCardForm;
