import React from "react";
import { StyleSheet, View } from "react-native";
import CreateUser from "./user/CreateUser";

const Home = () => {
  return (
    <View style={styles.container}>
      <CreateUser />
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
