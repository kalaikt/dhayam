import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Row, RowMid } from "./frame/Row";
import { getPaths } from "./frame/TravelPath";
import MoveCoin from "./frame/MoveCoin";

let travelPath = getPaths();

const DrawDhayam = () => {
  const [randomNo, setState] = useState(1);

  const randNum = () => {
    const no = Math.floor(Math.random() * 6) + 1;
    setState(no);

    //console.log(no);
  };

  const [travelPath, updatePath] = useState(getPaths)

  const onUpdatePath = (location: string, i: number, layout: any) => {
    travelPath.forEach((p:any) => {
      if (p.location == location && p.position == i) p.layout = layout;
    });
    console.log(travelPath);
  }


  return (
    <View style={styles.container}>
      <Row onUpdatePath={onUpdatePath} isTop="true" diceValue={randomNo} />
      <RowMid onUpdatePath={onUpdatePath} diceValue={randomNo} />
      <Row onUpdatePath={onUpdatePath} diceValue={randomNo} />
      <TouchableOpacity>
        <Text onPress={randNum}>Dial Dice</Text>
      </TouchableOpacity>
      <MoveCoin travelPath={travelPath}/>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "60%",
    // borderWidth: 1,
    // borderColor: "#f00",
    // borderStyle: "solid",
    padding: 5,
  },
  row: {
    // display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#f00",
    borderStyle: "solid",
    height: 100,
  },
  col: {
    flex: 1,
  },
});

export default DrawDhayam;
