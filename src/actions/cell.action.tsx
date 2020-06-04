import * as types from "../constants/ActionTypes";

export const updateCellLayout = (
  location: string,
  index: number,
  layout: any
) => ({
  type: types.UPDATE_CELL_LAYOUT,
  location,
  index,
  layout,
});

export const updateHomeCellLayout = (
  location: string,
  index: number,
  layout: any
) => ({
  type: types.UPDATE_HOME_CELL_LAYOUT,
  location,
  index,
  layout,
});

export const setCellLocation = (location: string, index: number) => {
  return (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      if (location.length) {
        dispatch({ type: types.SET_CELL_FILTER, location, index });
        resolve();
      } else {
        reject("Location not found");
      }
    });
  };
};

export const getCells = () => ({
  type: types.GET_CELLS,
});
