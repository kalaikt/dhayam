import React from "react";
import { StyleSheet, View } from "react-native";
import DrawDhayam from "./src/containers/DrawDhayam.containers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/reducers";
import thunk from "redux-thunk";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/views/Home";

const store = createStore(reducer, applyMiddleware(thunk));
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator  mode="modal" headerMode="none">
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
