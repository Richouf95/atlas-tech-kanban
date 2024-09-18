import { LabelType } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type lableState = {
    labels: LabelType[] | null
}

const initialState: lableState = {
    labels: null
}

const labelSlicce = createSlice({
    name: "labels",
    initialState,
    reducers: {
        setLables(state, action: PayloadAction<LabelType[]>) {
            state.labels = action.payload;
        },
        clearLabels(state) {
            state.labels = [];
        }
    }
})

export const {setLables, clearLabels} = labelSlicce.actions;
export default labelSlicce.reducer;