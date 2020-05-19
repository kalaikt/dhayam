import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Row, RowMid } from "./frame/Row";
import { getPaths } from "./frame/TravelPath";
import MoveCoin from "./frame/MoveCoin";
import {PLAYER_1} from "./constants/TravelRoot"

let travelPath = getPaths();
const screen = Dimensions.get("window");

const DrawDhayam = () => {
  const [randomNo, setState] = useState(1);

  const randNum = () => {
    const no = Math.floor(Math.random() * 6) + 1;
    setState(no);
  };

  const loadCoin = ()=> {
    return PLAYER_1.map((value, index)=><MoveCoin coin={index} key={`player${index}`} travelPath={travelPath} />);
  }

  const [travelPath, updatePath] = useState(getPaths);

  const onUpdatePath = (location: string, i: number, layout: any) => {
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
