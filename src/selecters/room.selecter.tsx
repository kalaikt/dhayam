import { createSelector } from "reselect";

const room = (state: any) => state.room;
const players = (state: any) => state.players;

export const getRoom = createSelector(room, (room) => {
  return room;
});

export const getPlayers = createSelector(players, (players) => {
  return players;
});
