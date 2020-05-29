import { combineReducers } from "redux";
import cellsReducer from "./cells.reducer";
import userReducer from "./user.reducer";
import roomReducer from "./room.reducer";

const rootReducer = combineReducers({
  cells: cellsReducer,
  users: userReducer,
  room: roomReducer
});

export default rootReducer;
