import * as types from "../constants/ActionTypes";

export const updateLayout = (location: string, index: number, layout: any) => ({
  type: types.UPDATE_LAYOUT,
  location,
  index,
  layout
});

export const updateHomeLayout = (location: string, index: number, layout: any) => ({
  type: types.UPDATE_HOME_LAYOUT,
  location,
  index,
  layout
});

export const getPlayers = () => ({
  type: types.UPDATE_HOME_LAYOUT,
});
