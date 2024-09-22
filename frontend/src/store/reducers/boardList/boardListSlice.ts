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
    addBoard(state, action: PayloadAction<Board>) {
      state.boardList.push(action.payload);
    },
    updateBoardsList(state, action: PayloadAction<Board>) {
      const index = state.boardList.findIndex(
        (board) => board._id === action.payload._id
      );

      if (index !== -1) {
        state.boardList[index] = {
          ...state.boardList[index],
          ...action.payload,
        };
      }
    },
    removeBoard(state, action: PayloadAction<string>) {
      state.boardList = state.boardList.filter(board => board._id !== action.payload);
    },
    clearBoardsList(state) {
      state.boardList = [];
    },
  },
});

export const { setBoardsList, updateBoardsList, clearBoardsList, addBoard, removeBoard } =
  boardsListSlice.actions;
export default boardsListSlice.reducer;
