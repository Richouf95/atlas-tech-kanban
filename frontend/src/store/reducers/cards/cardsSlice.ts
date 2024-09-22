import { Card } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type cardsState = {
  cards: Card[];
};

const initialState: cardsState = {
  cards: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
    addCard(state, action: PayloadAction<Card>) {
      state.cards.push(action.payload);
    },
    updateCard(state, action: PayloadAction<Card>) {
      const index = state.cards.findIndex(
        (card) => card._id === action.payload._id
      );

      if (index !== -1) {
        state.cards[index] = {
          ...state.cards[index],
          ...action.payload,
        };
      }
    },
    removeCard(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
    clearCards(state) {
      state.cards = [];
    },
  },
});

export const { setCards, addCard, updateCard, removeCard, clearCards } =
  cardSlice.actions;
export default cardSlice.reducer;
