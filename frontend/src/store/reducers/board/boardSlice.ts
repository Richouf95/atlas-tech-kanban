import { Board } from "@/types/Board";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type boardState = {
  board: Board | null;
};

const initialState: boardState = {
  board: null,
};

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
      setBoard(state, action: PayloadAction<Board>) {
        state.board = action.payload;
      },
      updateBoard(state, action: PayloadAction<Partial<Board>>) {
        if (state.board) {
          state.board = { ...state.board, ...action.payload };
        }
      },
      clearBoard(state) {
        state.board = null;
      },
    },
});

export const { setBoard, updateBoard, clearBoard } = boardSlice.actions;
export default boardSlice.reducer;