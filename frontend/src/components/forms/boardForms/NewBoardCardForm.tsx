"use client";

import { useMutation } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { LiveObject } from "@liveblocks/core";
import React, { FormEvent, useState } from "react";
import uniqid from "uniqid";

function NewBoardCardForm({ colId }: { colId: string }) {
  const [cardName, setCardName] = useState<string>("");

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
      })
    );
  }, []);

  const handleNewCard = (e: FormEvent) => {
    e.preventDefault();
    addCard(cardName);
  };

  return (
    <div>
      <form onSubmit={handleNewCard}>
        <input
          type="text"
          name="cardName"
          id="cardName"
          placeholder="Card name ..."
          onChange={(e) => setCardName(e.target.value)}
        />
      </form>
    </div>
  );
}

export default NewBoardCardForm;
