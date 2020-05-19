import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Col, ColMid, ColEmpty } from "./Col";

const {width, height} = Dimensions.get("window");

export const Row = ({ isTop, diceValue, onUpdatePath }: any) => {
  const onUpdate = (location: string, i: number, layout: any) => {
    onUpdatePath(location, i, layout);
  };

  return (
    <View style={styles.row}>
      <ColEmpty isCenter="flase" />
      <Col onUpdate={onUpdate} diceValue={diceValue} isTop={isTop} cells={25} />
      <ColEmpty isCenter="false" />
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
    borderColor: "#f00",
    borderStyle: "solid",
    height: "20%",
    flexDirection: "row",
    maxWidth: width > 1024 ? height * 0.55 : height,
  },
});
