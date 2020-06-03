import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as RoomActions from "../../actions/room.action";
import Avatar from "../user/Avatar";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../client";
import { getCurrentUser } from "../../selecters/user.selecter";
import { getRoom } from "../../selecters/room.selecter";
import PropTypes from "prop-types";

const Room = ({ currentUser, room, actions }: any) => {
  const navigation = useNavigation();
  const [playerList, setPlayers] = useState(room.players || []);

  useEffect(() => {
    if (!playerList.length) socket.emit("referesh");

    socket.on("getPlayers", (players: any) => {
      setPlayers(players);
      actions.joinRoom(players, room.name);
    });
  });

  socket.on("startGame", () => {
    navigation.navigate("Dhayam");
  });

  const startGame = () => {
    socket.emit("startGameManually");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>{room.name}</Text>
      </TouchableOpacity>
      <View style={styles.players}>
        {playerList.map((player: any, index: number) => (
          <Avatar key={`avatar${index}`} name={player.username} />
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

Room.propsTypes = {
  currentUser: PropTypes.object,
  room: PropTypes.object,
  actions: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
  currentUser: getCurrentUser(state),
  room: getRoom(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(RoomActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
