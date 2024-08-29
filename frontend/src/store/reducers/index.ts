import { combineReducers } from "redux";
import themeReducer from "./theme/themeSlice";
import authReducer from "./auth/authSlice";
import counterReducer from "./roomCreated/roomCreatedSlice";

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    counter: counterReducer,
});

export default rootReducer;
