import * as types from "../constants/ActionTypes";

export const addUser = (name: string) => ({
  type: types.ADD_USER,
  name,
});

export const setUser = (users: any, room: string) => ({
  type: types.SET_USER_LIST,
  room,
  users
});
