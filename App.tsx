import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/reducers";
import thunk from "redux-thunk";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/views/Home";
import DrawDhayam from "./src/containers/DrawDhayam.containers";
import Room from "./src/views/room/Room";
import { composeWithDevTools } from "redux-devtools-extension";
import CreateRoom from "./src/views/room/CreateRoom";
import JoinRoom from "./src/views/room/JoinRoom";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator mode="modal" headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Dhayam" component={DrawDhayam} />
          <Stack.Screen name="CreateRoom" component={CreateRoom} />
          <Stack.Screen name="JoinRoom" component={JoinRoom} />
          <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
