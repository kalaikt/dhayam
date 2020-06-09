import {
  CREATE_ROOM,
  JOIN_ROOM,
  REJOIN_ROOM,
  SET_CURRENT_ROOM,
  UPDATE_PLAYER_ORDER,
} from "../constants/ActionTypes";

const initialState: any = {};

export default function roomReducer(state = initialState, action: any) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        players: [{ username: action.username }],
        name: action.room,
      };

    case SET_CURRENT_ROOM:
      return {
        ...state,
        name: action.room,
        createdBy: action.createdBy,
      };

    case JOIN_ROOM:
      return {
        ...state,
        players: action.players,
        name: action.room,
      };

    case UPDATE_PLAYER_ORDER:
      return {
        ...state,
        players: action.players,
      };

    case REJOIN_ROOM:
      return {
        ...state,
        players: action.players,
        name: action.room,
      };

    default:
      return state;
  }
}
