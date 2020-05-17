import React from "react";
import { StyleSheet, View } from "react-native";
import { Col, ColMid, ColEmpty } from "./Col";

export const Row = ({ isTop, diceValue }: any) => {
  return (
    <View style={styles.row}>
      <ColEmpty isCenter="flase" />
      <Col diceValue={diceValue} isTop={isTop} cells={25} />
      <ColEmpty isCenter="false" />
    </View>
  );
};

Row.defaultProps = {
  isTop: false,
};

export const RowMid = ({ diceValue }: any) => {
  return (
    <View style={styles.rowMid}>
      <ColMid diceValue={diceValue} isLeft={true} />
      <ColEmpty isCenter="true" />
      <ColMid diceValue={diceValue} isLeft={false} />
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
  },
  rowMid: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    height: "20%",
    flexDirection: "row",
  },
});
