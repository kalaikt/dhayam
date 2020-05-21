import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import {
  CellMidProps,
  CellProps,
  CellState,
  CellMidState,
} from "./CellInterface";
import Icon from "react-native-vector-icons/FontAwesome";

export class Cell extends React.Component<CellProps, CellState> {
  location: string | null | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      index: props.index,
      position: props.position,
      showLocation: props.showLocation,
      cellIndex: props.cellIndex,
    };
    this.location = `${props.position}${props.cellIndex}`;
    this[`${this.location}`] = React.createRef();

    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(event: any) {
    const { cellIndex } = this.state;
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
        onPress(this.props.position, cellIndex, {
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        });
      }
    );
  }

  render() {
    const { index, position } = this.state;
    const colIngore = ["top", "bottom"];
    const style = (position == "topLeft" || position == "bottomRight" )&& styles.w100;
    return (
      <View
        ref={`${this.location}`}
        onLayout={this.onLayout}
        style={[
          styles.cell,
          (index % 5 >= 1 && index % 5 <= 3) ||
          (position == "top" && topPos.indexOf(index + 1) != -1) ||
          (position != "top" && bottomPos.indexOf(index + 1) != -1)
            ? styles.show
            : styles.hide,
          !colIngore.includes(position) && styles.startingCell,
          style,
        ]}
      >
        {addStar(position, index)}

      </View>
    );
  }
}

const topPos = [5, 21, 25];
const bottomPos = [1, 5, 21];
const safeZone: any = {
  top: [3, 21, 25],
  bottom: [1, 5, 23],
  left: [6],
  right: [10],
  topLeft: [],
  topRight: [],
  bottomLeft: [],
  bottomRight: [],
};

const addStar = (position: string, index: number) => {
  if (!safeZone[position]) return;
  if (safeZone[position].indexOf(index + 1) === -1) return;

  const { width } = Dimensions.get("screen");
  let size = 40;
  if (width < 450) size = 20;

  return <Icon name="star" size={size} />;
};

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

    this.location = `${props.isLeft ? "left" : "right"}${props.cellIndex}`;
    this[`${this.location}`] = React.createRef();

    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(event: any) {
    const { isLeft, cellIndex } = this.state;
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
  }

  render() {
    return (
      <View
        ref={`${this.location}`}
        onLayout={this.onLayout}
        style={styles.cellMid}
      >
        {addStar(this.props.isLeft ? "left" : "right", this.state.index)}
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
    alignItems: "center",
    justifyContent: "center",
  },
  startingCell: {
    height: "20%",
    width: "25%",
  },
  cellMid: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: "33.33%",
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  hide: {
    borderWidth: 0,
  },
  show: {
    borderWidth: 1,
  },
  w100: {
    width: "100%",
  }
});
