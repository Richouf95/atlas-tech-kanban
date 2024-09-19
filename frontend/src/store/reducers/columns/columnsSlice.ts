import { Column } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type columnState = {
  columns: Column[];
};

const initialState: columnState = {
  columns: [],
};

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<Column[]>) {
      state.columns = action.payload;
    },
    updateColumns(state, action: PayloadAction<Column[]>) {
      if (state.columns) {
        state.columns = [...action.payload];
      }
    },
    clearColumns(state) {
      state.columns = [];
    },
  },
});

export const { setColumns, updateColumns, clearColumns } = columnSlice.actions;
export default columnSlice.reducer;
