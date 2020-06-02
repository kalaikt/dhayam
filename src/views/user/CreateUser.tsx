import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Button, Keyboard } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addUser } from "../../actions/user.action";
import { joinRoom } from "../../actions/room.action";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../client";

const CreateUser = ({ actions }: any) => {
  const [value, onChangeText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    //socket.emit("reset");
  });

  const onPress = () => {
    if (value == "") return;

    Keyboard.dismiss();
    actions.addUser(value);
    socket.emit("joinRoom", value, "1234567");
  };

  socket.on("roomUsers", (users: any) => {
    navigation.navigate("Room");
  });

  const onReset = () => {
    socket.emit("reset");
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        placeholder="Enter your name"
      />
      <Button title="Add User" onPress={onPress} />
      <Button title="Reset" onPress={onReset} />
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

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({ addUser, joinRoom }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
