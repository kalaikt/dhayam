import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Column  from "../columns/Column";
const { width, height } = Dimensions.get("window");

export const RowMid = () => {
  return (
    <View style={styles.rowMid}>
      <Column position="left" />
      <Column type="empty" position="home" />
      <Column position="right" />
    </View>
  );
};

const styles = StyleSheet.create({
  rowMid: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    height: "23%",
    flexDirection: "row",
    width: "100%",
    maxWidth: width > 1024 ? height * 0.55 : height,
  },
});
