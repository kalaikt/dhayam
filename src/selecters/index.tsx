import { createSelector } from "reselect";

const getCellsRespose = (state: any) => state.cells.cellsLayout;
const getHomeRespose = (state: any) => state.cells.home;
const getPath = (state: any) => state.cells.path.player1;

export const getPlayer1TravelPath = createSelector(getPath, (paths) => {
  return paths;
});

export const getCellsLayout = createSelector(getCellsRespose, (cells) => {
  return cells;
});

export const getPlayer1Coins = createSelector(getHomeRespose, (home) => {
  return home.bottomLeftHome;
});

export const getPlayer2Coins = createSelector(getHomeRespose, (home) => {
  return home.topLeftHome;
});

export const getPlayer3Coins = createSelector(getHomeRespose, (home) => {
  return home.topRightHome;
});

export const getPlayer4Coins = createSelector(getHomeRespose, (home) => {
  return home.bottomRightHome;
});
