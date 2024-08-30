import React from "react";
import BoardCard from "./BoardCard";
import { ReactSortable } from "react-sortablejs";
import NewBoardCardForm from "@/components/forms/boardForms/NewBoardCardForm";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { Card } from "@/types";
import { shallow } from "@liveblocks/client";
import ColumnHeader from "./ColumnHeader";

function BoardColumn({
  id,
  name,
  filterParams,
}: {
  id: string;
  name: string;
  filterParams: any;
}) {
  const columnsCards = useStorage<Card[]>((root) => {
    const hasCards = root.cards;
    if (!hasCards) {
      const emptyCardList: Card[] = [];
      return emptyCardList;
    }

    return root.cards
      .filter((x) => x.columnId === id)
      .map((y) => ({ ...y }))
      .sort((a, b) => a.index - b.index);
  }, shallow);

  const columns = useStorage(
    (root) => root.columns.map((col) => ({ ...col })),
    shallow
  );

  const column = columns?.filter((x) => x.id === id)[0];

  const filteredCards =
    columnsCards &&
    columnsCards.filter((card) => {
      // Filtrer par searchKey
      if (filterParams.searchKey && column) {
        const searchKey = filterParams.searchKey.toLowerCase();

        // Vérifier si le nom de la colonne correspond au searchKey
        const columnMatchesSearch = column.name
          .toLowerCase()
          .includes(searchKey);

        // Vérifier si au moins une carte de la colonne correspond au searchKey
        const cardsInColumn = columnsCards.filter(
          (card) => card.columnId === id
        );
        const cardMatchesSearch = cardsInColumn.some(
          (card) =>
            card.name.toLowerCase().includes(searchKey) ||
            card.description.toLowerCase().includes(searchKey)
        );

        if (!columnMatchesSearch && !cardMatchesSearch) {
          return false;
        }
      }

      // Filtrer par assignees
      if (
        filterParams.selectedAssignees.length > 0 &&
        !filterParams.selectedAssignees.includes(card.assigned)
      ) {
        return false;
      }

      // Filtrer par due dates
    if (
      filterParams.selectedDueDates.length > 0
    ) {
      // Exclure les cartes ayant une dueDate égale à "N/A"
      if (card.dueDate === "N/A") {
        return false;
      }

      const today = new Date();
      const cardDate = new Date(card.dueDate);

      // Réinitialiser l'heure des dates pour ne comparer que les jours
      today.setHours(0, 0, 0, 0);
      cardDate.setHours(0, 0, 0, 0);

      // Calculer la différence de jours entre la date actuelle et la dueDate de la carte
      const diffTime = cardDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir le temps en jours

      // Déterminer si la carte correspond à l'une des options de deadline
      const isOverdue = diffDays < 0;
      const isToday = diffDays === 0;
      const isDueTomorrow = diffDays === 1;

      // Vérifier si la carte correspond aux filtres de dates sélectionnés
      if (
        (isOverdue && !filterParams.selectedDueDates.includes("overdue")) ||
        (isToday && !filterParams.selectedDueDates.includes("today")) ||
        (isDueTomorrow && !filterParams.selectedDueDates.includes("dueTomorrow"))
      ) {
        return false;
      }
    }

      // Filtrer par labels
      if (
        filterParams.selectedLabels.length > 0 &&
        !filterParams.selectedLabels.includes(
          typeof card.label === "string" ? card.label : card.label.id
        )
      ) {
        return false;
      }

      return true;
    });

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
    const allCards: Card[] = storedCards
      ? [...storedCards.map((x) => x.toObject())]
      : [];

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

  console.log(filteredCards);
  const searchKeyLower = filterParams.searchKey.toLowerCase();

  const onlyMatchedCards =
    filteredCards &&
    filteredCards.filter(
      (card) =>
        card.name.toLowerCase().includes(searchKeyLower) ||
        card.description.toLowerCase().includes(searchKeyLower)
    );

  if (
    onlyMatchedCards?.length === 0 &&
    (filterParams.searchKey !== "" ||
      filterParams.selectedColumns.length !== 0 ||
      filterParams.selectedAssignees.length !== 0 ||
      filterParams.selectedDueDates.length !== 0 ||
      filterParams.selectedLabels.length !== 0)
  ) {
    return null;
  }

  return (
    <div className="min-w-72 max-w-72 rounded-xl columnsClass">
      <ColumnHeader id={id} name={name} />
      {onlyMatchedCards && (
        <ReactSortable
          list={onlyMatchedCards}
          setList={(item) => setCardOrder(item, id)}
          group={"Cards"}
        >
          {onlyMatchedCards.map((item) => (
            <div key={item.id} className="mx-2">
              <BoardCard {...item} />
            </div>
          ))}
        </ReactSortable>
      )}
      <NewBoardCardForm colId={id} />
    </div>
  );
}

export default BoardColumn;
