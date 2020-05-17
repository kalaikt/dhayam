import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  CellMidProps,
  CellProps,
  CellState,
  CellMidState,
} from "./CellInterface";

export class Cell extends React.Component<CellProps, CellState> {
  constructor(props: any) {
    super(props);
    this.state = {
      index: props.index,
      isTop: props.isTop,
      showLocation: props.showLocation,
      cellIndex: props.cellIndex,
    };

    this.onTouch = this.onTouch.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      showLocation: nextProps.showLocation,
    });
  }

  onTouch() {
    const { onPress } = this.props;
    const { isTop, cellIndex } = this.state;

    onPress(isTop, cellIndex);
  }

  render() {
    const { index, isTop, showLocation } = this.state;
    return (
      <View
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
  constructor(props: any) {
    super(props);

    this.state = {
      index: props.index,
      isLeft: props.isLeft,
      showLocation: props.showLocation,
      cellIndex: props.cellIndex,
    };
  }

  onTouch() {
    const { onPress } = this.props;
    const { isLeft, cellIndex } = this.state;

    onPress(isLeft, cellIndex);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      showLocation: nextProps.showLocation,
    });
  }

  render() {
    const { showLocation } = this.state;
    return (
      <View style={styles.cellMid}>
        <Text>
          {showLocation && (
            <Icon style={styles.location} name="location-on" size={30} />
          )}
        </Text>
      </View>
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
  location: {
    position: "absolute",
    top: -10,
    left: -2,
  },
});
