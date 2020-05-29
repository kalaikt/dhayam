import { createSelector } from "reselect";

const getUsersResponse = (state: any) => state.users;

export const getCurrentUser = createSelector(getUsersResponse, (users) => {
  return users;
});
