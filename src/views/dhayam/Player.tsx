import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Avatar from "../user/Avatar";
import Dice from "./Dice";

const Player = ({ align, name }: any) => {
  return (
    <View style={styles.player}>
      {align == "right" && (
        <View style={styles.flex}>
          <Dice />
        </View>
      )}
      <View
        style={[
          styles.flex,
          { alignItems: align == "right" ? "flex-end" : "flex-start" },
        ]}
      >
        <Avatar name={name} />
      </View>
      {align == "left" && (
        <View style={styles.flex}>
          <Dice />
        </View>
      )}
    </View>
  );
};

Player.defaultProps = {
  align: "left",
};

const styles = StyleSheet.create({
  player: {
    borderWidth: 0,
    width: "50%",
    height: "100%",
    padding: 10,
    flexDirection: "row",
  },
  flex: {
    flex: 1,
    borderWidth: 1,
  },
});

export default Player;
