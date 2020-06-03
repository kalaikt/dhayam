import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Row, RowMid } from "../frame/rows";
import MoveCoin from "../frame/MoveCoin";
import Player from "./Player";

const screen = Dimensions.get("window");

type props = {
  [key: string]: any;
  player1: any;
  player2: any;
  player3: any;
  player4: any;
  travelPath: any;
  actions: any;
  currentUser: any;
  room: any;
};

interface Player {
  [key: string]: any;
}

type states = {
  player1: any;
  player2: any;
  player3: any;
  player4: any;
  travelPath: any;
  topTable: any;
  bottomTable: any;
};

class DrawDhayam extends React.Component<props, states> {
  constructor(props: any) {
    super(props);

    this.state = {
      player1: props.player1,
      player2: props.player2,
      player3: props.player4,
      player4: props.player3,
      travelPath: props.travelPath,
      topTable: [],
      bottomTable: [],
    };

    this.loadCoin = this.loadCoin.bind(this);
  }

  setCurrentUser = (users: any) => {
    let players = users;
    players = users.map((user: any) =>
      user.username == this.props.currentUser.username
        ? { ...user, isCurrentUser: true }
        : { ...user, isCurrentUser: false }
    );

    return players;
  };

  setPlayerTravelPath = (players: any) => {
    const curent_index = players.findIndex(
      (player: any) => player.isCurrentUser
    );

    return players.map((player: any, index: number) => {
      const indx =
        curent_index + index < players.length ? curent_index + index : 0;
      const playerPath = `player${
        players.length === 2 && index != curent_index
          ? 3
          : players.length == 3 && index == 2
          ? 4
          : indx + 1
      }`;

      return {
        ...players[indx],
        ...this.props[`${playerPath}`],
      };
    });
  };

  UNSAFE_componentWillMount() {
    let players: any = this.setCurrentUser(this.props.room.players);
    const { topTable, bottomTable } = this.buildPlayer(
      this.setPlayerTravelPath(players)
    );

    this.setState({
      topTable: topTable,
      bottomTable: bottomTable,
    });
  }

  componentDidMount() {
    this.setState({
      player1: this.props.player1,
      travelPath: this.props.travelPath,
    });

    //setTimeout(() => {
    let players: any = this.setCurrentUser(this.props.room.players);
    const { topTable, bottomTable } = this.buildPlayer(
      this.setPlayerTravelPath(players)
    );

    this.setState({
      topTable: topTable,
      bottomTable: bottomTable,
    });
    // }, 1000);
  }

  loadCoin = (player: any) => {
    if (!player.coins) return;

    return player.coins.map((h: any, index: number) => (
      <MoveCoin
        coin={index}
        key={`player${index}`}
        layout={h.layout}
        travelPath={player.travelPath}
        color={player.color}
        isCurrentUser={player.isCurrentUser}
      />
    ));
  };

  buildPlayer = (players: any) => {
    const topTable: any = [];
    const bottomTable: any = [];

    players.map((player: any, index: number) => {
      if (
        index == 0 ||
        (players.length == 4 && index == 3) ||
        (players.length == 3 && index == 2)
      )
        bottomTable.push(player);
      else topTable.push(player);
    });
    console.log(topTable.length, bottomTable.length);
    return { topTable, bottomTable };
  };

  render() {
    const { topTable, bottomTable } = this.state;
    return (
      <View style={styles.mainContainer}>
        {topTable.map((player: any) => this.loadCoin(player))}
        {bottomTable.map((player: any) => this.loadCoin(player))}
        <View
          style={[
            styles.playerSection,
            topTable.length == 1 &&
              bottomTable.length == 1 &&
              styles.alignRight,
          ]}
        >
          {topTable.map((player: any, index: number) => (
            <Player
              key={`topTable${index}`}
              name={player.username}
              align={
                (topTable.length == 1 && bottomTable.length == 1) || index == 1
                  ? "right"
                  : "left"
              }
            />
          ))}
        </View>
        <View style={styles.dhayam}>
          <View style={styles.container}>
            <Row position="top" />
            <RowMid />
            <Row position="bottom" />
          </View>
        </View>
        <View style={styles.playerSection}>
          {bottomTable.map((player: any, index: number) => (
            <Player
              key={`bottomTable${index}`}
              name={player.username}
              align={index == 1 ? "right" : "left"}
            />
          ))}
        </View>
      </View>
    );
  }
}
const userSize = (100 - (screen.width / screen.height) * 100) / 2;
const width = screen.width > 760 ? 0 : 0;
const styles = StyleSheet.create({
  container: {
    width: screen.width < 1024 ? screen.width - width : 1024,
    height: screen.width < 1024 ? screen.width - width : 1024,
    padding: 10,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  dhayam: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderWidth: 0,
  },
  playerSection: {
    flexDirection: "row",
    width: "100%",
    height: `${userSize - 1}%`,
  },
  mainContainer: {
    paddingTop:
      screen.width > 760 ? screen.height * 0.02 : screen.height * 0.04,
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
  alignRight: {
    justifyContent: "flex-end",
  },
});

export default DrawDhayam;
