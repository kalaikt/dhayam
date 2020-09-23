import * as types from "../constants/ActionTypes";

export const createRoom = (username: string, room: string) => ({
  type: types.CREATE_ROOM,
  username,
  room,
});

export const joinRoom = (players: any, room: string) => {
  return (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      if (room.length) {
        dispatch({
          type: types.JOIN_ROOM,
          room,
          players,
        });
        resolve(getState());
      } else {
        reject();
      }
    });
  };
};

export const setCurrentRoom = (room: string, createdBy: string = "") => ({
  type: types.SET_CURRENT_ROOM,
  room,
  createdBy,
});

export const updatePlayerOrder = (players: any) => ({
  type: types.UPDATE_PLAYER_ORDER,
  players,
});

export const rejoinRoom = (players: any, room: string) => ({
  type: types.REJOIN_ROOM,
  room,
  players,
});

export const updateCoinLocation = (
  player: string,
  location: string,
  index: number,
  coinIndex: number
) => ({
  type: types.UPDATE_COIN_POSITION,
  player,
  location,
  index,
  coinIndex,
});

export const setLocationFilter = (filter: Object) => {
  return (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      if (!!filter) {
        dispatch({ type: types.SET_PLAYER_FILTER, filter });
        resolve();
      } else {
        reject();
      }
    });
  };
};
