import { Animated, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

type states = { pan: Animated.ValueXY; value: any };
interface props {
  travelPath: any;
}

export default class MoveCoin extends React.Component<props, states> {
  travelIndex = 0;
  animate = React.createRef();
  dy = 0;
  constructor(props: any) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY({ x: 0, y: 0 }), // inits to zero
      value: { x: 0, y: -70 },
    };

    this.moveCoin = this.moveCoin.bind(this);
  }

  move(value: number, ind = 0) {
    const dy = -(250 * 2);
    if (value == ind) {
      const { pageX, pageY } = this.props.travelPath[this.travelIndex].layout;
      this.state.pan.setValue({ x: pageX - 8, y: dy + pageY });
      return;
    }

    ++this.travelIndex;
    const { pageX, pageY } = this.props.travelPath[this.travelIndex].layout;
    console.log(value, pageX, pageY);
    Animated.timing(this.state.pan, {
      delay: 300,
      toValue: { x: pageX - 8, y: dy + pageY },
    }).start(() => this.move(value, ++ind));
  }

  moveCoin(event: any) {
    console.log(event);
    const randam = Math.floor(Math.random() * 6) + 1;
    this.move(randam);
  }

  render() {
    return (
      <Animated.View
        style={[this.state.pan.getLayout(), { position: "relative" }]}
      >
        <Icon style={styles.icon} name="location-on" size={30} onPress={this.moveCoin} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
   width: 25,
   height: 28
  },
});
