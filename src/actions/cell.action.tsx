import * as types from "../constants/ActionTypes";

export const updateCellLayout = (location: string, index: number, layout: any) => ({
  type: types.UPDATE_CELL_LAYOUT,
  location,
  index,
  layout
});

export const updateHomeCellLayout = (location: string, index: number, layout: any) => ({
  type: types.UPDATE_HOME_CELL_LAYOUT,
  location,
  index,
  layout
});

export const getCells = () => ({
  type: types.GET_CELLS,
});
