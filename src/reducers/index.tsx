import { combineReducers } from "redux";
import cellsReducer from "./cells.reducer";

const rootReducer = combineReducers({
  cellsReducer: cellsReducer,
});

export default rootReducer;
