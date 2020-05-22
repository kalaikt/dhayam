import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Row, RowMid } from "./frame/rows";
import { getPlayer1Paths, PlayersHome } from "./constants/TravelPath";
import MoveCoin from "./frame/MoveCoin";

const screen = Dimensions.get("window");

const DrawDhayam = () => {
  const [randomNo, setState] = useState(1);
  const [travelPath, updatePath] = useState(getPlayer1Paths);
  const [playersHome, updateHome] = useState(PlayersHome);

  const randNum = () => {
    const no = Math.floor(Math.random() * 6) + 1;
    setState(no);
  };

  const loadCoin = () => {
    const players = [{ path: travelPath, home: playersHome.bottomLeftHome }];

    return players.map((player) => {
      return player.home.map((h, index) => {
        return (
          <MoveCoin
            coin={index}
            key={`player${index}`}
            travelPath={player.path}
            layout={h.layout}
          />
        );
      });
    });
  };

  const onUpdatePath = (location: string, i: number, layout: any) => {
    if (location.includes("Home")) {
      playersHome[location][i] = { layout };
      return;
    }

    travelPath.forEach((p: any) => {
      if (p.location == location && p.position == i) p.layout = layout;
    });
  };

  return (
    <View style={styles.mainContainer}>
      {loadCoin()}
      <View style={styles.playerSection}></View>
      <View style={styles.container}>
        <Row position="top" />
        <RowMid />
        <Row position="bottom" />
      </View>
      <View style={styles.playerSection}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screen.width < 1024 ? screen.width : 1024,
    height: screen.width < 1024 ? screen.width : 1024,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playerSection: {
    width: "100%",
    height: "20%",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
});

export default DrawDhayam;
