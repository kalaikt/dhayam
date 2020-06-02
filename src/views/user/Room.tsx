import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as RoomActions from "../../actions/room.action";
import Avatar from "./Avatar";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../client";
import { getCurrentUser } from "../../selecters/user.selecter";
import { getPlayers } from "../../selecters/room.selecter";

const Room = ({ currentUser, players, actions }: any) => {
  const navigation = useNavigation();
  const [userList, setUsers] = useState([]);

  useEffect(() => {
    if (!userList.length) socket.emit("getPlayers");
    console.log(userList)
    socket.on("roomUsers", (users: any) => {
      setUsers(users);
      actions.joinRoom(users, "1234567");
    });
  });

  socket.on("startGame", () => {
    navigation.navigate("Dhayam");
  });

  const startGame = () => {
    socket.emit("manualStartGame");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Back</Text>
      </TouchableOpacity>
      <View style={styles.players}>
        {userList.map((user: any, index: number) => (
          <Avatar key={`avatar${index}`} name={user.username} />
        ))}
      </View>
      <TouchableOpacity onPress={startGame}>
        <Text>Start Game</Text>
      </TouchableOpacity>
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
    padding: 50,
  },
  players: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

const mapStateToProps = (state: any) => ({
  currentUser: getCurrentUser(state),
  players: getPlayers(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(RoomActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
