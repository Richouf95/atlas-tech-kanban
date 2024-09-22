import { combineReducers } from "redux";
import themeReducer from "./theme/themeSlice";
import authReducer from "./auth/authSlice";
import counterReducer from "./roomCreated/roomCreatedSlice";
import boardReducer from "./board/boardSlice";
import columnReducer from "./columns/columnsSlice";
import cardReducer from "./cards/cardsSlice";
import labelReducer from "./labels/labelsSlice";
import projectReducer from "./projects/projectSlice";
import boardsListReducer from "./boardList/boardListSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  counter: counterReducer,
  board: boardReducer,
  columns: columnReducer,
  cards: cardReducer,
  labels: labelReducer,
  projects: projectReducer,
  boardsList: boardsListReducer,
});

export default rootReducer;
