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

const BoardColumn = 
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
    const columnsCards = useSelector((state: RootState) => state.cards.cards);
    const dispatch = useDispatch();
    const triggerApp = useApp();
    const cardChangeStreamRef: any = useRef(null);

    // useEffect(() => {if(columnsCards) alert('gege')},[boardId])

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
    }, [fetchCards, dispatch, boardId]);

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

    const filteredCards =
      columnsCards &&
      columnsCards.filter((card) => {
        if (!filterParams) return;

        // Filtrer par searchKey
        if (filterParams.searchKey) {
          const searchKey = filterParams.searchKey.toLowerCase();

          // Vérifier si le nom de la colonne correspond au searchKey
          const columnMatchesSearch = name
            .toLowerCase()
            .includes(searchKey);

          // Vérifier si au moins une carte de la colonne correspond au searchKey
          const cardsInColumn = columnsCards.filter(
            (card) => card.columnId === _id
          );
          const cardMatchesSearch = cardsInColumn.some(
            (card) =>
              card.name.toLowerCase().includes(searchKey) ||
              card.description?.toLowerCase().includes(searchKey)
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
        if (filterParams.selectedDueDates.length > 0) {
          // Exclure les cartes ayant une dueDate égale à "N/A"
          if (!card.dueDate) {
            return false;
          }

          const today = new Date();
          const d = card.dueDate?.toString() || "";
          const cardDate = new Date(d);

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
            (isDueTomorrow &&
              !filterParams.selectedDueDates.includes("dueTomorrow"))
          ) {
            return false;
          }
        }

        // Filtrer par labels
        if (
          filterParams.selectedLabels.length > 0 &&
          !filterParams.selectedLabels.includes(
            typeof card.label === "string" ? card.label : card.label
          )
        ) {
          return false;
        }

        return true;
      });

    const searchKeyLower = filterParams
      ? filterParams.searchKey.toLowerCase()
      : "";

    const onlyMatchedCards =
      filteredCards &&
      filteredCards.filter(
        (card) =>
          card.name.toLowerCase().includes(searchKeyLower) ||
          card.description?.toLowerCase().includes(searchKeyLower)
      );

    if (!filterParams) return;
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

    const colsCards =
      onlyMatchedCards &&
      onlyMatchedCards
        .map((x) => ({
          ...x,
          id: x._id,
        }))
        .filter((x) => x.columnId === _id)
        .sort((a, b) => a.index - b.index);

        console.log(colsCards)

    return (
      <div className="min-w-72 max-w-72 rounded-xl columnsClass">
        <ColumnHeader id={_id} name={name} />
        {colsCards && (
          <ReactSortable
            list={colsCards}
            // setList={(item) => setCardOrder(item, id)}
            setList={(newCards) => setCardOrder(newCards, _id)}
            group={"Cards"}
          >
            {colsCards.map((item) => (
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
;

export default BoardColumn;
