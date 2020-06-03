import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as RoomActions from "../../actions/room.action";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../client";
import { getCurrentUser } from "../../selecters";
import randomatic from "randomatic";

const CreateRoom = ({ currentUser, actions }: any) => {
  const navigation = useNavigation();

  socket.on("getPlayers", (players: any, room: string) => {
    actions.joinRoom(players, room).then(() => {
      navigation.navigate("Room");
    });
  });

  const createRoom = () => {
    const room: string = randomatic("0", 6);
    console.log(currentUser, room);
    actions.setCurrentRoom(room);
    socket.emit("createRoom", room);
    socket.emit("joinRoom", currentUser.username, room);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={createRoom}>
        <Text>Create Room</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("JoinRoom")}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
