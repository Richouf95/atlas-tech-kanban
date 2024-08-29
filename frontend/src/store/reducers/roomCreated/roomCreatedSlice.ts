import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

const roomCreatedSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        onRoomCreated(state) {
            return state + 1;
        }
    }
})

export const { onRoomCreated } = roomCreatedSlice.actions;
export default roomCreatedSlice.reducer;