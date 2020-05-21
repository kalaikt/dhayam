import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Row, RowMid } from "./frame/Row";
import { getPaths, PlayersHome } from "./frame/TravelPath";
import MoveCoin from "./frame/MoveCoin";
import { PLAYER_1 } from "./constants/TravelRoot";

const screen = Dimensions.get("window");

const DrawDhayam = () => {
  const [randomNo, setState] = useState(1);
  const [travelPath, updatePath] = useState(getPaths);
  const [playersHome, updateHome] = useState(PlayersHome);

  const randNum = () => {
    const no = Math.floor(Math.random() * 6) + 1;
    setState(no);
  };

  const loadCoin = () => {
    const players = [{ path: travelPath, home: playersHome.bottomLeftHome }];

    console.log();

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
        <Row onUpdatePath={onUpdatePath} isTop="true" diceValue={randomNo} />
        <RowMid
          travelPath={travelPath}
          onUpdatePath={onUpdatePath}
          diceValue={randomNo}
        />
        <Row onUpdatePath={onUpdatePath} diceValue={randomNo} />
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
