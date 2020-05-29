import * as types from "../constants/ActionTypes";

export const createRoom = (username: string, room: string) => ({
  type: types.CREATE_ROOM,
  username,
  room,
});

export const joinRoom = (players: any, room: string) => ({
  type: types.JOIN_ROOM,
  room,
  players,
});

export const rejoinRoom = (players: any, room: string) => ({
  type: types.REJOIN_ROOM,
  room,
  players,
});
