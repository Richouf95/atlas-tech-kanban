import { combineReducers } from "redux";
import themeReducer from "./theme/themeSlice";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
});

export default rootReducer;
