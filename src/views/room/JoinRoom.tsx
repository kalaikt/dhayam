import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as RoomActions from "../../actions/room.action";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../client";
import { getCurrentUser } from "../../selecters";
import { TextInput } from "react-native-gesture-handler";

const JoinRoom = ({ currentUser, actions }: any) => {
  const [room, onChangeText] = useState("");
  const navigation = useNavigation();

  socket.on("getPlayers", (players: any, room: string) => {
    actions.joinRoom(players, room).then(() => {
      navigation.navigate("Room");
    });
  });

  const joinRoom = () => {
    actions.setCurrentRoom(room);
    socket.emit("joinRoom", currentUser.username, room);
  };

  return (
    <View style={styles.container}>
      <Text>Enter room code</Text>
      <TextInput
        onChangeText={(value) => onChangeText(value)}
        placeholder="Enter room code"
      />
      <TouchableOpacity onPress={joinRoom}>
        <Text>Join Room</Text>
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
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(RoomActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
