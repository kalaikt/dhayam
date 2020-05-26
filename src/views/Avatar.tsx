import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Avatar = () => {
  const { width } = Dimensions.get("screen");
  let size = 120;
  if (width < 450) size = 50;

  return <Icon name="user" size={size} />;
};

export default Avatar;
