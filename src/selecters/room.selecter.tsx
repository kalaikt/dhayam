import { createSelector } from 'reselect';

const room = (state: any) => state.room;
const players = (state: any) => state.room.players;
const filter = (state: any) => state.filter;

export const getRoom = createSelector(room, (room) => {
  return room;
});

export const getPlayers = createSelector(players, (players) => {
  return players;
});

export const isCoinAtSameLocation = createSelector(
  [players, filter],
  (players, fltPlayer) => {
    if (!fltPlayer) return false;

    const player = players.filter(
      (player: any) => fltPlayer.player === player.player
    );

    const [coins] = player;
    return coins.filter(
      (coin: any) =>
        coin.location === fltPlayer.location && coin.index === fltPlayer.index
    ).length;
  }
);
