import { combineReducers } from "redux";
import themeReducer from "./theme/themeSlice";
import authReducer from "./auth/authSlice";
import counterReducer from "./roomCreated/roomCreatedSlice";
import boardReducer from './board/boardSlice';
import columnReducer from "./columns/columnsSlice";

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    counter: counterReducer,
    board: boardReducer,
    columns: columnReducer,
});

export default rootReducer;
