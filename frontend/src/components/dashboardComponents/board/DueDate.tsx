import React, { useCallback, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { Card } from "@/types";
import { updateCardDueDate } from "@/lib/cardsActions";
import { setCards } from "@/store/reducers/cards/cardsSlice";

function DueDate({ id, dueDate }: { id: string; dueDate?: string }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [pickDate, setPickDate] = useState<boolean>(false);
  const cards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();

  // const updateCardDueDate = useMutation(({ storage }, cardId, updateData) => {
  //   const cards = storage.get("cards");
  //   const index = cards.findIndex((card) => card.toObject().id === cardId);
  //   const thisCard = storage.get("cards").get(index);
  //   for (let key in updateData) {
  //     thisCard?.set(key as keyof Card, updateData[key]);
  //   }
  // }, []);

  const addDueDate = useCallback(async (id: string, selectedDate: string) => {
    try {
      const response = await updateCardDueDate(id, selectedDate);
      if (response && cards) {
        const cardsUpdated = cards.map((card) =>
          card._id === id ? { ...card, dueDate: selectedDate } : card
        );
        dispatch(setCards(cardsUpdated));
      }
    } catch (error) {
      console.error("Erreur lors de l'ajour d'une dueDate' :", error);
    }
  }, []);

  return (
    <div className="my-2 flex items-center justify-end gap-2">
      <p>
        <AccessTimeIcon /> Due date :
      </p>{" "}
      {pickDate ? (
        <input
          type="date"
          defaultValue={dueDate}
          onChange={(e) => {
            const selectedDate = e.target.value;
            addDueDate(id, selectedDate);
            setPickDate(false);
          }}
          className="text-black"
        />
      ) : !dueDate ? (
        <p
          className={`px-4 py-1 rounded-xl cursor-pointer ${
            theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
          }`}
          onClick={() => setPickDate(true)}
        >
          Add date
        </p>
      ) : (
        <p
          className={`px-4 py-1 rounded-xl cursor-pointer ${
            theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
          }`}
          onClick={() => setPickDate(true)}
        >
          {dueDate}
        </p>
      )}
    </div>
  );
}

export default DueDate;
