import { createSelector } from "reselect";

const getCellsRespose = (state: any) => state.cells.cellsLayout;
const getHomeRespose = (state: any) => state.cells.home;
const getPlayer1Path = (state: any) => state.cells.path.player1;
const getPlayer2Path = (state: any) => state.cells.path.player2;
const getPlayer3Path = (state: any) => state.cells.path.player3;
const getPlayer4Path = (state: any) => state.cells.path.player4;
const getCellLocation = (state: any) => state.cells.filter;

export const getLayout = createSelector(
  [getCellsRespose, getCellLocation],
  (layouts, filter) => {
    const result = layouts.filter(
      (cell: any) =>
        cell.location === filter.location && cell.index === filter.index
    );

    if (result.length) return result[0].layout;

    return {};
  }
);

export const getPlayer1TravelPath = createSelector(getPlayer1Path, (paths) => {
  return paths;
});

export const getPlayer2TravelPath = createSelector(getPlayer2Path, (paths) => {
  return paths;
});

export const getPlayer3TravelPath = createSelector(getPlayer3Path, (paths) => {
  return paths;
});

export const getPlayer4TravelPath = createSelector(getPlayer4Path, (paths) => {
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
