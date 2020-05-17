import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import DrawDhayam from "./src/DrawDhayam";
import MoveCoin from "./src/frame/MoveCoin"
export default function App() {
  return (
    <View style={styles.container}>
      <DrawDhayam />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
