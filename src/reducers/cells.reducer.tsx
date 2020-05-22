import {
  UPDATE_LAYOUT,
  UPDATE_HOME_LAYOUT,
  GET_PLAYERS,
} from "../constants/ActionTypes";
import { getPlayer1Paths } from "../constants";
import { PlayersHome } from "../constants";

const initialState = { cellsLayout: [], home: PlayersHome };

const updateLayout = (state: any, action: any) => {
  state.cellsLayout = [...state.cellsLayout, action];
  return state;
};

const updateHomeLayout = (state: any, action: any) => {
  state.home[action.location][action.index] = { layout: action.layout };
  return state;
};

export default function cellsReducer(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_LAYOUT:
      return updateLayout(state, action);

    case UPDATE_HOME_LAYOUT:
      return updateHomeLayout(state, action);

    case GET_PLAYERS:
      return state;

    default:
      return state;
  }
}
