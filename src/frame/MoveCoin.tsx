import { Animated } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

type states = { pan: Animated.ValueXY; value: any };

export default class MoveCoin extends React.Component<{}, states> {
  constructor(props: any) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
      value: { x: 0, y: -70 },
    };

    this.moveCoin = this.moveCoin.bind(this);
  }

  move(value: Number, ind = 0) {
    if (value === ind) {
      this.state.pan.setValue(this.state.value);
      return;
    }

    const dy = this.state.value.y - (ind + 1) * 25;
    this.setState({ value: { y: dy } });

    Animated.timing(this.state.pan, {
      toValue: { x: 0, y: dy },
    }).start(() => {
      this.move(value, ++ind);
    });
  }

  moveCoin() {
    const randam = Math.floor(Math.random() * 6) + 1;
    this.move(randam);
  }

  render() {
    return (
      <Animated.View style={this.state.pan.getLayout()}>
        <Icon name="location-on" size={30} onPress={this.moveCoin} />
      </Animated.View>
    );
  }
}
