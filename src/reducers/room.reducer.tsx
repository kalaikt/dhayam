import { CREATE_ROOM, JOIN_ROOM, REJOIN_ROOM } from "../constants/ActionTypes";

const initialState: any = {};

export default function roomReducer(state = initialState, action: any) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        players: [{ username: action.username, room: action.room }],
        room: action.room,
      };

    case JOIN_ROOM:
      return {
        ...state,
        players: action.players,
        room: action.room,
      };

    case REJOIN_ROOM:
      return {
        ...state,
        players: action.players,
        room: action.room,
      };

    default:
      return state;
  }
}
