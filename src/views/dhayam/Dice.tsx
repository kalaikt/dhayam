import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Avatar from "../user/Avatar";
import { socket } from "../../client";

const Dice = () => {
  const [randam, setState] = useState(0);
  const dial = () => {
    const randNum = Math.floor(Math.random() * 6) + 1;
    setState(randNum);
  };
  return (
    <View style={styles.dice} onTouchStart={dial}>
      <Text style={styles.text}>{randam}</Text>
    </View>
  );
};

Dice.defaultProps = {
  //align: "flex-start",
};

const styles = StyleSheet.create({
  dice: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});

export default Dice;
