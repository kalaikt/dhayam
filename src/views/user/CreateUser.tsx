import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Keyboard,
  AsyncStorage,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addUser } from "../../actions/user.action";
import { useNavigation } from "@react-navigation/native";

const CreateUser = ({ actions }: any) => {
  const [value, onChangeText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("username", (error, name) => {
      if (name?.length) {
        actions.addUser(name);
        navigation.navigate("CreateRoom");
      }
    });
  });

  const onPress = () => {
    if (value == "") return;

    Keyboard.dismiss();
    actions.addUser(value);
    AsyncStorage.setItem("username", value);
    navigation.navigate("CreateRoom");
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
  actions: bindActionCreators({ addUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
