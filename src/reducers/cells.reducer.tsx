import {
  UPDATE_CELL_LAYOUT,
  UPDATE_HOME_CELL_LAYOUT,
  GET_CELLS,
  SET_CELL_FILTER,
} from "../constants/ActionTypes";
import {
  PlayersHome,
  getPlayer1Paths,
  getPlayer2Paths,
  getPlayer3Paths,
  getPlayer4Paths,
} from "../constants";

const initialState = {
  cellsLayout: [],
  home: PlayersHome,
  path: {
    player1: getPlayer1Paths(),
    player2: getPlayer2Paths(),
    player3: getPlayer3Paths(),
    player4: getPlayer4Paths(),
  },
  filter: { location: "", index: 0 },
};

const updateCellLayout = (state: any, action: any) => {
  state.cellsLayout = [...state.cellsLayout, action];
  return state;
};

const updateHomeCellLayout = (state: any, action: any) => {
  state.home[action.location][action.index] = { layout: action.layout };
  return state;
};

export default function cellsReducer(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_CELL_LAYOUT:
      return updateCellLayout(state, action);

    case UPDATE_HOME_CELL_LAYOUT:
      return updateHomeCellLayout(state, action);

    case SET_CELL_FILTER:
      state.filter = {
        location: action.location,
        index: action.index,
      };
      return {
        ...state,
        filter: { location: action.location, index: action.index },
      };

    case GET_CELLS:
      return state;

    default:
      return state;
  }
}
