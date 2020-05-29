import { createSelector } from "reselect";

const room = (state: any) => state.room;

export const getRoom = createSelector(room, (room) => {
  return room;
});
