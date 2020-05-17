import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Row, RowMid } from "./frame/Row";

const DrawDhayam = () => {
  const [randomNo, setState] = useState(0);

  const randNum = () => {
    const no = Math.floor(Math.random() * 6) + 1;
    setState(no);

    //console.log(no);
  };

  return (
    <View style={styles.container}>
      <Row isTop="true" diceValue={randomNo} />
      <RowMid diceValue={randomNo} />
      <Row diceValue={randomNo} />
      <TouchableOpacity>
        <Text onPress={randNum}>Dial Dice</Text>
      </TouchableOpacity>
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
