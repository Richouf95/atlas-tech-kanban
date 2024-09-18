import { Board } from "@/types/Board";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type boardState = {
  board: Board[];
};

const initialState: boardState = {
  board: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<Board[]>) {
      state.board = action.payload;
    },
    updateBoard(state, action: PayloadAction<Partial<Board>>) {
      if (state.board) {
        state.board = { ...state.board, ...action.payload };
      }
    },
    clearBoard(state) {
      state.board = [];
    },
  },
});

export const { setBoard, updateBoard, clearBoard } = boardSlice.actions;
export default boardSlice.reducer;
