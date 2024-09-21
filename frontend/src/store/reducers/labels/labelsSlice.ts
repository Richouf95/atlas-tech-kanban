import { LabelType } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type lableState = {
    labels: LabelType[]
}

const initialState: lableState = {
    labels: []
}

const labelSlicce = createSlice({
    name: "labels",
    initialState,
    reducers: {
        setLables(state, action: PayloadAction<LabelType[]>) {
            state.labels = action.payload;
        },
        addLabel(state, action: PayloadAction<LabelType>) {
            state.labels.push(action.payload);
        },
        clearLabels(state) {
            state.labels = [];
        }
    }
})

export const {setLables, addLabel, clearLabels} = labelSlicce.actions;
export default labelSlicce.reducer;