import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { socket } from "../../client";
import { getCurrentUser, getPlayers, getRoom } from "../../selecters";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as RoomActions from "../../actions/room.action";
import PropTypes from "prop-types";
import { CAN_DICE_REROLL } from "../../constants";

const Dice = ({ players, playerName, currentUser, room }: any) => {
  const [randam, setState] = useState(0);
  const [isActive, setActive] = useState(false);
  const [isDhayamOccured, setDhayamOccured] = useState(false);

  const roll = () => {
    const randNum = Math.floor(Math.random() * 6) + 1;
    setState(randNum);
    socket.emit("changeDice", room.name, currentUser.username, randNum);
    if (randNum === 1) setDhayamOccured(true);
    if (!isDhayamOccured && randNum != 1) {
      setActive(false);
      socket.emit("switchToNextPlayer", currentUser.username);
    }
  };

  useEffect(() => {
    socket.on("moveToNextPlayer", (username: string) => {
      if (username == playerName) setActive(true);
      else setActive(false);
    });

    socket.on("getDiceValue", (plrName: string, diceValue: number, players: any, isAllCoinsAtHome: boolean) => {
      if (playerName == plrName) {
        setState(diceValue);
        setDhayamOccured(!isAllCoinsAtHome);
      }
    });

    return () => {
      socket.off("moveToNextPlayer");
      socket.off("getDiceValue");
      socket.off("switchToNextPlayer");
    };
  }, []);

  if (playerName == currentUser.username && isActive)
    return (
      <View style={[styles.dice, styles.active]} onTouchStart={roll}>
        <Text style={styles.text}>{randam == 0 ? "Roll" : randam}</Text>
      </View>
    );

  return (
    <View style={[styles.dice, isActive && styles.active]}>
      <Text style={styles.text}>{randam == 0 ? "Roll" : randam}</Text>
    </View>
  );
};

Dice.propsTypes = {
  currentUser: PropTypes.object,
  room: PropTypes.object,
  actions: PropTypes.object,
};

const styles = StyleSheet.create({
  dice: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
  active: {
    backgroundColor: "#73e600",
  },
});

const mapStateToProps = (state: any) => ({
  currentUser: getCurrentUser(state),
  players: getPlayers(state),
  room: getRoom(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(RoomActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dice);
