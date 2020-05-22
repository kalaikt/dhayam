import { Animated, StyleSheet, Platform, Dimensions } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

type states = { pan: Animated.ValueXY; value: any; showIcon: boolean };
interface props {
  travelPath: any;
  coin: number;
  layout: any;
}

export default class MoveCoin extends React.Component<props, states> {
  travelIndex = 0;
  animate = React.createRef();
  dy = 0;
  constructor(props: any) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
      value: { x: 0, y: -70 },
      showIcon: false,
    };

    this.moveCoin = this.moveCoin.bind(this);
  }

  move(value: number, ind = 0) {
    const screen = Dimensions.get("screen");
    const dx = screen.width > 414 ? -10 : 0;
    const dy = -10;
    if (value == ind) {
      const { x, y, pageX, pageY, width, height } = this.props.travelPath[
        this.travelIndex
      ].layout;
      this.state.pan.setValue({ x: pageX - dx, y: pageY + dy });
      return;
    }

    ++this.travelIndex;
    const { x, y, pageX, pageY } = this.props.travelPath[
      this.travelIndex
    ].layout;
    /* console.log(value, this.props.travelPath[
      this.travelIndex
    ]); */

    Animated.timing(this.state.pan, {
      delay: 300,
      // toValue: { x: pageX - dx, y: pageY + dy },
      toValue: { x: pageX - dx, y: pageY + dy },
    }).start(() => this.move(value, ++ind));
  }

  moveCoin(event: any) {
    const randam = Math.floor(Math.random() * 6) + 1;
    console.log(this.travelIndex + randam , this.props.travelPath.length)
    if (this.travelIndex + randam < this.props.travelPath.length)
      this.move(randam);
  }

  componentDidMount() {
    setTimeout(() => {
      const { pageX, pageY, x, y, width, height } = this.props.layout;

      this.state.pan.setValue({ 
        x: pageX + (width/2 - 20),
        y: pageY + (height/2) - 20,
      });

      console.log(this.props.layout);
      this.setState({ showIcon: true });
    }, 1000);
  }

  render() {
    const { width } = Dimensions.get("screen");
    let size = 40;
    if (width < 450) size = 20;
    return (
      <Animated.View style={[this.state.pan.getLayout(), styles.coin]}>
        {this.state.showIcon && (
          <Icon
            style={styles.icon}
            name="location-on"
            size={size}
            onPress={this.moveCoin}
          />
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: "25%",
    height: 40,
    color: "red",
    //left: -1000,
  },
  coin: {
    width: "25%",
    height: 40,
    position: "absolute",
    zIndex: 100,
  },
});
