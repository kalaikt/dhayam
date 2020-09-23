import {
  CREATE_ROOM,
  JOIN_ROOM,
  REJOIN_ROOM,
  SET_CURRENT_ROOM,
  UPDATE_PLAYER_ORDER,
  UPDATE_COIN_POSITION,
  SET_PLAYER_FILTER,
} from "../constants/ActionTypes";

const initialState: any = {
  filter: {}
};

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

    case UPDATE_COIN_POSITION:
      return {
        ...state,
        players: state.players.map((player: any) => {
          return player.username == action.player
            ? {
                ...player,
                coins: player.coins.map((coin: any) =>
                  coin.coinIndex == action.coinIndex
                    ? {
                        ...coin,
                        index: action.position,
                        location: action.location,
                      }
                    : coin
                ),
              }
            : player;
        }),
      };

    case SET_PLAYER_FILTER:
      return {
        ...state,
        filter: action.filter,
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
