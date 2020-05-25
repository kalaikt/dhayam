import { Animated, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as CellActions from "../../actions";
import { getCellsLayout } from "../../selecters";

type states = {
  pan: Animated.ValueXY;
  value: any;
  showIcon: boolean;
  cellsLayout: any;
  travelPath: any;
};
interface props {
  coin: number;
  layout: any;
  cellsLayout: any;
  travelPath: any;
  color: string;
}

class MoveCoin extends React.Component<props, states> {
  travelIndex = 0;
  animate = React.createRef();
  dy = 0;
  constructor(props: any) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
      value: {},
      showIcon: false,
      cellsLayout: props.cellsLayout,
      travelPath: props.travelPath,
    };

    this.moveCoin = this.moveCoin.bind(this);
  }

  getLayout = (idx: number) => {
    const { location, index } = this.props.travelPath[idx];
    const layout = this.state.cellsLayout.filter(
      (p: any) => p.location == location && p.index == index
    );

    layout[0].layout.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        this.setState({ value: { x, y, width, height, pageX, pageY } });
      }
    );
  };

  move(value: number, ind = 0) {
    const screen = Dimensions.get("screen");
    const dx = screen.width > 414 ? -10 : 0;
    const dy = -10;
    if (value == ind) {
      this.state.pan.setValue({
        x: this.state.value.pageX - dx,
        y: this.state.value.pageY + dy,
      });
      return;
    }

    this.getLayout(this.travelIndex);
    this.travelIndex++;
    setTimeout(() => {
      Animated.timing(this.state.pan, {
        delay: 300,
        toValue: {
          x: this.state.value.pageX - dx,
          y: this.state.value.pageY + dy,
        },
      }).start(() => this.move(value, ++ind));
    }, 10);
  }

  moveCoin(event: any) {
    const randam = Math.floor(Math.random() * 6) + 1;
    //const randam = 1;
    console.log(randam);
    if (this.travelIndex == 0 && randam != 1) return;
    if (this.travelIndex + randam <= this.props.travelPath.length)
      this.move(randam);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.layout.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          this.state.pan.setValue({
            x: pageX + (width / 2 - 20),
            y: pageY + height / 2 - 20,
          });

          this.setState({ showIcon: true });
        }
      );
    }, 500);
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
            color={this.props.color}
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
  },
  coin: {
    width: "25%",
    height: 40,
    position: "absolute",
    zIndex: 200,
  },
});

const mapStateToProps = (state: any) => ({
  cellsLayout: getCellsLayout(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoveCoin);
