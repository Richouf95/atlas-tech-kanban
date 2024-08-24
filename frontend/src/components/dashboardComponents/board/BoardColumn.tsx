import React from "react";
import BoardCard from "./BoardCard";
import { ReactSortable } from "react-sortablejs";
import NewBoardCardForm from "@/components/forms/boardForms/NewBoardCardForm";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { Card } from "@/types";
import { shallow } from "@liveblocks/client";

function BoardColumn({ id, name }: { id: string; name: string }) {
  const columnsCards = useStorage<Card[]>((root) => {
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

  const setCardOrder = useMutation(({storage}, cards:Card[], newColumId) => {
    const cardsIds = cards.map(x => x.id.toString());
    const allCards:Card[] = [...storage.get('cards').map(x => x.toObject())];
    cardsIds.forEach((cardId, colIndex) => {
      const thisCardIndex = allCards.findIndex(x => x.id.toString() === cardId);
      updateCardPosition(thisCardIndex , {
        columnId: newColumId,
        index: colIndex,
      })
    })
  }, []);

  return (
    <div className="mx-5 border p-5 min-w-64 bg-gray-50">
      <div className="bg-blue-300 drag-handle">{name}</div>
      {columnsCards && (
        <ReactSortable
          list={columnsCards}
          setList={(item) => setCardOrder(item, id)}
          group={"Cards"}
          // handle=".drag-handle" // Ajout de handle ici
        >
          {columnsCards.map((item) => (
            <BoardCard key={item.id} id={item.id} name={item.name} />
          ))}
        </ReactSortable>
      )}
      <NewBoardCardForm colId={id} />
    </div>
  );
}

export default BoardColumn;
