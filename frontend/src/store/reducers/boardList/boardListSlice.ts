import { Board } from "@/types/Board";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type boardsListState = {
  boardList: Board[];
};

const initialState: boardsListState = {
  boardList: [],
};

const boardsListSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardsList(state, action: PayloadAction<Board[]>) {
      state.boardList = action.payload;
    },
    updateBoardsList(state, action: PayloadAction<Partial<Board>>) {
      if (state.boardList) {
        state.boardList = { ...state.boardList, ...action.payload };
      }
    },
    clearBoardsList(state) {
      state.boardList = [];
    },
  },
});

export const { setBoardsList, updateBoardsList, clearBoardsList } = boardsListSlice.actions;
export default boardsListSlice.reducer;
