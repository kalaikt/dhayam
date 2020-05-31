import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Avatar = ({ name }: any) => {
  const { width } = Dimensions.get("screen");
  let size = 80;
  if (width < 450) size = 50;

  return (
    <View style={styles.avatar}>
      <Icon name="user" size={size} />
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    //padding: 10,
  },
});
export default Avatar;
