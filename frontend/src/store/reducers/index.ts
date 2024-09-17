import { combineReducers } from "redux";
import themeReducer from "./theme/themeSlice";
import authReducer from "./auth/authSlice";
import counterReducer from "./roomCreated/roomCreatedSlice";
import boardReducer from './board/boardSlice';

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    counter: counterReducer,
    board: boardReducer,
});

export default rootReducer;
