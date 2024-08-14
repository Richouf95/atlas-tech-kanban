const initialState = { value: 0 };

export default function counterReducer(state = initialState, action) {
    switch (action.type) {
        case "counter/inscrement":
            return { ...state, value: state.value + 1 };
            break;
        case "counter/decrement":
            return { ...state, value: state.value - 1 };
        default:
            return state;
    }
}