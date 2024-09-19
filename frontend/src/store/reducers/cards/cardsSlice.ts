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
    clearCards(state) {
      state.cards = [];
    },
  },
});

export const { setCards, clearCards } = cardSlice.actions;
export default cardSlice.reducer;
