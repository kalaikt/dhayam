import React from "react";
import { StyleSheet, View } from "react-native";
import DrawDhayam from "../containers/DrawDhayam.containers";

const Home = () => {
  return (
    <View style={styles.container}>
      <DrawDhayam />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
