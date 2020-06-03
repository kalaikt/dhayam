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

export const setCurrentRoom = (room: string) => ({
  type: types.SET_CURRENT_ROOM,
  room,
});

export const rejoinRoom = (players: any, room: string) => ({
  type: types.REJOIN_ROOM,
  room,
  players,
});
