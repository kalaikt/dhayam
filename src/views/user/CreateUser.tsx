import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Button, Keyboard } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as CellActions from "../../actions/user.action";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../client";

const CreateUser = ({ actions }: any) => {
  const [value, onChangeText] = useState("");
  const navigation = useNavigation();

  const onPress = () => {
    if (value == "") return;

    Keyboard.dismiss();
    actions.addUser(value);
    socket.emit("joinRoom", value, "1234567");
    navigation.navigate("Room");
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        placeholder="Enter your name"
      />
      <Button title="Add User" onPress={onPress} />
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
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
