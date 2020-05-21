import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Col, ColMid, ColEmpty, StartingCells } from "./Col";

const { width, height } = Dimensions.get("window");

export const Row = ({ isTop, diceValue, onUpdatePath }: any) => {
  const onUpdate = (location: string, i: number, layout: any) => {
    onUpdatePath(location, i, layout);
  };

  const position = isTop ? "top" : "bottom";

  return (
    <View style={styles.row}>
      <StartingCells position={`${position}Left`} onUpdate={onUpdate} />
      <Col onUpdate={onUpdate} diceValue={diceValue} position={position} cells={25} />
      <StartingCells position={`${position}Right`} onUpdate={onUpdate} />
    </View>
  );
};

Row.defaultProps = {
  isTop: false,
};

export const RowMid = ({ diceValue, travelPath, onUpdatePath }: any) => {
  const onUpdate = (location: string, i: number, layout: any) => {
    onUpdatePath(location, i, layout);
  };

  return (
    <View style={styles.rowMid}>
      <ColMid onUpdate={onUpdate} diceValue={diceValue} isLeft={true} />
      <ColEmpty onUpdate={onUpdate} isCenter="true" />
      <ColMid onUpdate={onUpdate} diceValue={diceValue} isLeft={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    height: "33%",
    flexDirection: "row",
    maxWidth: width > 1024 ? height * 0.55 : height,
  },
  rowMid: {
    borderWidth: 0,
    paddingLeft: 25,
    paddingRight: 25,
    borderColor: "#f00",
    borderStyle: "solid",
    height: "20%",
    flexDirection: "row",
    maxWidth: width > 1024 ? height * 0.55 : height,
  },
});
