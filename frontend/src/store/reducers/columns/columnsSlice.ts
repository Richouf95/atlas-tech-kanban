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
    addColumn(state, action: PayloadAction<Column>) {
      state.columns.push(action.payload);
    },
    updateColumns(state, action: PayloadAction<Column>) {
      const index = state.columns.findIndex(
        (column) => column._id == action.payload._id
      );

      if (index !== -1) {
        state.columns[index] = {
          ...state.columns[index],
          ...action.payload,
        };
      }
    },
    removeColumn(state, action: PayloadAction<string>) {
      state.columns = state.columns.filter(
        (colum) => colum._id !== action.payload
      );
    },
    clearColumns(state) {
      state.columns = [];
    },
  },
});

export const {
  setColumns,
  addColumn,
  updateColumns,
  removeColumn,
  clearColumns,
} = columnSlice.actions;
export default columnSlice.reducer;
