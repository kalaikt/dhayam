import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  CellMidProps,
  CellProps,
  CellState,
  CellMidState,
} from "./CellInterface";

export class Cell extends React.Component<CellProps, CellState> {
  location: string | null | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      index: props.index,
      isTop: props.isTop,
      showLocation: props.showLocation,
      cellIndex: props.cellIndex,
    };
    this.location = `${props.isTop ? "top" : "bottom"}${props.cellIndex}`;
    this[`${this.location}`] = React.createRef();
    this.onTouch = this.onTouch.bind(this);
    this.onLayout = this.onLayout.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      showLocation: nextProps.showLocation,
    });
  }

  onTouch(event: any) {
    const { onPress } = this.props;
    const { isTop, cellIndex } = this.state;
    //console.log(event);
    //onPress(isTop, cellIndex);
  }

  onLayout(event: any) {
    const { isTop, cellIndex } = this.state;
    /* TravelPath.setValue(
      isTop ? "top" : "bottom",
      cellIndex,
      event.nativeEvent.layout
    ); */

    const { onPress } = this.props;

    //console.log(TravelPath);

    this.refs[this.location].measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        onPress(isTop, cellIndex, { x, y, width, height, pageX, pageY });
      }
    );
  }

  render() {
    const { index, isTop, showLocation } = this.state;
    return (
      <View
        ref={`${this.location}`}
        onLayout={this.onLayout}
        onTouchStart={this.onTouch}
        style={[
          styles.cell,
          (index % 5 >= 1 && index % 5 <= 3) ||
          (isTop && topPos.indexOf(index + 1) != -1) ||
          (!isTop && bottomPos.indexOf(index + 1) != -1)
            ? styles.show
            : styles.hide,
        ]}
      >
        {showLocation && (
          <Icon style={styles.location} name="location-on" size={30} />
        )}
      </View>
    );
  }
}

const topPos = [21, 25];
const bottomPos = [1, 5];

export class CellMid extends React.Component<CellMidProps, CellMidState> {
  location: string | undefined;

  constructor(props: any) {
    super(props);

    this.state = {
      index: props.index,
      isLeft: props.isLeft,
      showLocation: props.showLocation,
      cellIndex: props.cellIndex,
    };

    this.location = `${props.isTop ? "top" : "bottom"}${props.cellIndex}`;
    this[`${this.location}`] = React.createRef();

    this.onTouch = this.onTouch.bind(this);
    this.onLayout = this.onLayout.bind(this);
  }

  onTouch() {
    const { onPress } = this.props;
    const { isLeft, cellIndex } = this.state;

    // onPress(isLeft, cellIndex);
  }

  onLayout(event: any) {
    const { isLeft, cellIndex } = this.state;
    /*  TravelPath.setValue(
      isLeft ? "left" : "right",
      cellIndex,
      event.nativeEvent.layout
    );
     */
    const { onPress } = this.props;

    this.refs[this.location].measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        onPress(isLeft, cellIndex, { x, y, width, height, pageX, pageY });
      }
    );
    //console.log(TravelPath);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      showLocation: nextProps.showLocation,
    });
  }

  render() {
    const { showLocation } = this.state;
    return (
      <View
        ref={`${this.location}`}
        onLayout={this.onLayout}
        style={styles.cellMid}
      />
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    borderColor: "#000",
    borderStyle: "solid",
    height: "20%",
    width: "20%",
  },
  cellMid: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: "33.33%",
    width: "20%",
  },
  hide: {
    borderWidth: 0,
  },
  show: {
    borderWidth: 1,
  },
});
