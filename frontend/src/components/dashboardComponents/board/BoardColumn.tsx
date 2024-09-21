"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import BoardCard from "./BoardCard";
import { ReactSortable } from "react-sortablejs";
import NewBoardCardForm from "@/components/forms/boardForms/NewBoardCardForm";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import ColumnHeader from "./ColumnHeader";
import { LivBlockCard } from "@/app/liveblocks.config";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards, updateCardOrder } from "@/lib/cardsActions";
import {
  addCard,
  // removeCard,
  setCards,
  // updateCard,
} from "@/store/reducers/cards/cardsSlice";
import { RootState } from "@/store/store";
import CardModal from "@/components/modals/CardModal";
import { Card } from "@/types";
import { useApp } from "@/hooks/useMongoTiggerApp";

const BoardColumn = React.memo(
  ({
    _id,
    name,
    filterParams,
    boardId,
  }: {
    _id: string;
    name: string;
    filterParams: any;
    boardId: string;
  }) => {
    const cards = useSelector((state: RootState) => state.cards.cards);
    // const [cards, setCardsState] = useState<Card[]>([]);
    const dispatch = useDispatch();
    const triggerApp = useApp();
    const cardChangeStreamRef: any = useRef(null);

    const fetchCards = useCallback(async () => {
      if (!boardId) return;
      const response = await getAllCards(boardId);
      if (response) {
        // setCardsState(response);
        dispatch(setCards(response));
      }
    }, [boardId, dispatch]);

    useEffect(() => {
      fetchCards();
    }, [fetchCards, dispatch]);

    const setCardOrder = useCallback(
      async (cards: Card[], columnId: string) => {
        // Mettre à jour les indices des cartes dans la colonne
        const updatedCards = cards.map((card, index) => ({
          ...card,
          index,
          columnId,
        }));

        try {
          // Mettre à jour l'ordre des cartes dans MongoDB
          await Promise.all(
            updatedCards.map((card) =>
              updateCardOrder(card._id, columnId, card.index)
            )
          );

          // Mettre à jour l'état Redux
          // dispatch(setCards(updatedCards));
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour de l'ordre des cartes :",
            error
          );
        }
      },
      [dispatch]
    );

    const columnsCards =
      cards &&
      cards
        .map((x) => ({
          ...x,
          id: x._id,
        }))
        .filter((x) => x.columnId === _id)
        .sort((a, b) => a.index - b.index);

    return (
      <div className="min-w-72 max-w-72 rounded-xl columnsClass">
        <ColumnHeader id={_id} name={name} />
        {columnsCards && (
          <ReactSortable
            list={columnsCards}
            // setList={(item) => setCardOrder(item, id)}
            setList={(newCards) => setCardOrder(newCards, _id)}
            group={"Cards"}
          >
            {columnsCards.map((item) => (
              <div
                key={item.id}
                className="mx-2"
                tabIndex={0}
                aria-label={`Card ${item.name}`}
                role="region"
              >
                {/* <BoardCard {...item} /> */}
                <CardModal {...item} />
              </div>
            ))}
          </ReactSortable>
        )}
        <NewBoardCardForm colId={_id} boardId={boardId} />
      </div>
    );
  }
);

export default BoardColumn;

// useEffect(() => {
//   if (!triggerApp) return;

//   const cardsTrigger = async () => {
//     try {
//       const mongodb = triggerApp.currentUser?.mongoClient("Cluster0");
//       const cardsCollection = mongodb
//         ?.db("atlas-tech-db")
//         .collection("cards");

//       cardChangeStreamRef.current = cardsCollection?.watch();
//       const cardsChangeStream = cardChangeStreamRef.current;

//       for await (const change of cardsChangeStream) {
//         if (change.operationType === "insert") {
//           const newCard = {
//             ...change.fullDocument,
//             _id: change.documentKey._id.toString(),
//           };
//           dispatch(addCard(newCard));
//           console.log("Card Added !")
//         }
//         if (change.operationType === "update") {
//           const updatedCard = {
//             ...change.fullDocument,
//             _id: change.documentKey._id.toString(),
//           };
//           dispatch(updateCard(updatedCard));
//           console.log("Card Updated !")
//         }
//         if (change.operationType === "delete") {
//           dispatch(removeCard(change.documentKey._id.toString()));
//           console.log("Card Deleted !")
//         }
//       }
//     } catch (error) {
//       console.error("Erreur lors de la connexion :", error);
//     }
//   };

//   cardsTrigger();
// }, [triggerApp]);

// const column = columns?.filter((x) => x.id === id)[0];

// const filteredCards =
//   columnsCards &&
//   columnsCards.filter((card) => {
//     // Filtrer par searchKey
//     if (filterParams.searchKey && column) {
//       const searchKey = filterParams.searchKey.toLowerCase();

//       // Vérifier si le nom de la colonne correspond au searchKey
//       const columnMatchesSearch = column.name
//         .toLowerCase()
//         .includes(searchKey);

//       // Vérifier si au moins une carte de la colonne correspond au searchKey
//       const cardsInColumn = columnsCards.filter(
//         (card) => card.columnId === id
//       );
//       const cardMatchesSearch = cardsInColumn.some(
//         (card) =>
//           card.name.toLowerCase().includes(searchKey) ||
//           card.description.toLowerCase().includes(searchKey)
//       );

//       if (!columnMatchesSearch && !cardMatchesSearch) {
//         return false;
//       }
//     }

//     // Filtrer par assignees
//     if (
//       filterParams.selectedAssignees.length > 0 &&
//       !filterParams.selectedAssignees.includes(card.assigned)
//     ) {
//       return false;
//     }

//     // Filtrer par due dates
//     if (filterParams.selectedDueDates.length > 0) {
//       // Exclure les cartes ayant une dueDate égale à "N/A"
//       if (card.dueDate === "N/A") {
//         return false;
//       }

//       const today = new Date();
//       const cardDate = new Date(card.dueDate);

//       // Réinitialiser l'heure des dates pour ne comparer que les jours
//       today.setHours(0, 0, 0, 0);
//       cardDate.setHours(0, 0, 0, 0);

//       // Calculer la différence de jours entre la date actuelle et la dueDate de la carte
//       const diffTime = cardDate.getTime() - today.getTime();
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir le temps en jours

//       // Déterminer si la carte correspond à l'une des options de deadline
//       const isOverdue = diffDays < 0;
//       const isToday = diffDays === 0;
//       const isDueTomorrow = diffDays === 1;

//       // Vérifier si la carte correspond aux filtres de dates sélectionnés
//       if (
//         (isOverdue && !filterParams.selectedDueDates.includes("overdue")) ||
//         (isToday && !filterParams.selectedDueDates.includes("today")) ||
//         (isDueTomorrow &&
//           !filterParams.selectedDueDates.includes("dueTomorrow"))
//       ) {
//         return false;
//       }
//     }

//     // Filtrer par labels
//     if (
//       filterParams.selectedLabels.length > 0 &&
//       !filterParams.selectedLabels.includes(
//         typeof card.label === "string" ? card.label : card.label.id
//       )
//     ) {
//       return false;
//     }

//     return true;
//   });

// const updateCardPosition = useMutation(({ storage }, index, updateData) => {
//   const thisCard = storage.get("cards").get(index);
//   if (thisCard) {
//     for (let key in updateData) {
//       thisCard.set(key as keyof Card, updateData[key]);
//     }
//   }
// }, []);

// const setCardOrder = useMutation(({ storage }, cards: Card[], newColumId) => {
//   const cardsIds = cards.map((x) => x.id.toString());

//   // Safely get the "cards" from storage, defaulting to an empty array if undefined
//   const storedCards = storage.get("cards");
//   const allCards: Card[] = storedCards
//     ? [...storedCards.map((x) => x.toObject())]
//     : [];

//   cardsIds.forEach((cardId, colIndex) => {
//     const thisCardIndex = allCards.findIndex(
//       (x) => x.id.toString() === cardId
//     );
//     if (thisCardIndex !== -1) {
//       updateCardPosition(thisCardIndex, {
//         columnId: newColumId,
//         index: colIndex,
//       });
//     }
//   });
// }, []);

// console.log(filteredCards);
// const searchKeyLower = filterParams.searchKey.toLowerCase();

// const onlyMatchedCards =
//   filteredCards &&
//   filteredCards.filter(
//     (card) =>
//       card.name.toLowerCase().includes(searchKeyLower) ||
//       card.description.toLowerCase().includes(searchKeyLower)
//   );

// if (
//   onlyMatchedCards?.length === 0 &&
//   (filterParams.searchKey !== "" ||
//     filterParams.selectedColumns.length !== 0 ||
//     filterParams.selectedAssignees.length !== 0 ||
//     filterParams.selectedDueDates.length !== 0 ||
//     filterParams.selectedLabels.length !== 0)
// ) {
//   return null;
// }
