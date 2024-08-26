import React from "react";
import BoardCard from "./BoardCard";
import { ReactSortable } from "react-sortablejs";
import NewBoardCardForm from "@/components/forms/boardForms/NewBoardCardForm";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { Card } from "@/types";
import { shallow } from "@liveblocks/client";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function BoardColumn({ id, name }: { id: string; name: string }) {
  const columnsCards = useStorage<Card[]>((root) => {
    const hasCards = root.cards;
    if (!hasCards) {
      const emptyCardList:Card[] = []
      return emptyCardList;
    }

    return root.cards
      .filter((x) => x.columnId === id)
      .map((y) => ({ ...y }))
      .sort((a, b) => a.index - b.index);
  }, shallow);

  const updateCardPosition = useMutation(({ storage }, index, updateData) => {
    const thisCard = storage.get("cards").get(index);
    if (thisCard) {
      for (let key in updateData) {
        thisCard.set(key as keyof Card, updateData[key]);
      }
    }
  }, []);

  const setCardOrder = useMutation(({ storage }, cards: Card[], newColumId) => {
    const cardsIds = cards.map((x) => x.id.toString());
  
    // Safely get the "cards" from storage, defaulting to an empty array if undefined
    const storedCards = storage.get("cards");
    const allCards: Card[] = storedCards ? [...storedCards.map((x) => x.toObject())] : [];
  
    cardsIds.forEach((cardId, colIndex) => {
      const thisCardIndex = allCards.findIndex(
        (x) => x.id.toString() === cardId
      );
      if (thisCardIndex !== -1) {
        updateCardPosition(thisCardIndex, {
          columnId: newColumId,
          index: colIndex,
        });
      }
    });
  }, []);
  

  return (
    <div className="min-w-72 max-w-72 border rounded-xl border-0 columnsClass">
      <div className="flex items-center justify-between rounded-xl cursor-pointer px-4 py-2 uniquement">
        <h2 className="text-lg font-bold">{name} </h2>
        <MoreHorizIcon />
      </div>
      {columnsCards && (
        <ReactSortable
          list={columnsCards}
          setList={(item) => setCardOrder(item, id)}
          group={"Cards"}
        >
          {columnsCards.map((item) => (
            <div className="mx-2">
              <BoardCard key={item.id} id={item.id} name={item.name} />
            </div>
          ))}
        </ReactSortable>
      )}
      <NewBoardCardForm colId={id} />
    </div>
  );
}

export default BoardColumn;
