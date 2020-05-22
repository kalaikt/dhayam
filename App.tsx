import React from "react";
import { StyleSheet, View } from "react-native";
import DrawDhayam from "./src/views/DrawDhayam";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/reducers";

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <DrawDhayam />
      </View>
    </Provider>
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
