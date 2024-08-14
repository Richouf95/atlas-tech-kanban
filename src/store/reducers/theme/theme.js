const initialState = {
    theme: "light"
}

export default function themeReducer (state = initialState, action) {
    switch (action.type) {
        case "theme/toggle":
            const newTheme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem('theme', newTheme);

            return {
                ...state,
                theme: newTheme
            }
            break;
        case "theme/set":
            localStorage.setItem('theme', action.payload);
            
            return {
                ...state,
                theme: action.payload
            }
            break;
    
        default:
            return state;
    }
}