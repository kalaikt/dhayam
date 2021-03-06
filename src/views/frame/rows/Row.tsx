import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Column  from "../columns/Column";
import PropTypes from "prop-types";
import PlayerHome from "../columns/PlayerHome";

const { width, height } = Dimensions.get("window");

export const Row = ({ position }: any) => {
  return (
    <View style={styles.row}>
      <PlayerHome position={`${position}Left`} />
      <Column position={position} />
      <PlayerHome position={`${position}Right`} />
    </View>
  );
};

Row.prototype = {
  position: PropTypes.string.isRequired,
};

Row.defaultProps = {
  isTop: false,
};

const styles = StyleSheet.create({
  row: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    height: "37%",
    flexDirection: "row",
    width: "100%",
    maxWidth: width > 1024 ? height * 0.55 : height,
  }
});
