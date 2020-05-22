import React from "react";
import { StyleSheet, View } from "react-native";
import Cell from "../../../containers/cells.container";
import PropTypes from "prop-types";
import { getAllCells } from "../../../constants";

export const Column = ({ position, type }: any) => {
  const loadCell = () => {
    const cells = getAllCells()[position];
    return cells.map((cell: any) => (
      <Cell
        key={position + cell.cellIndex}
        index={cell.cellIndex}
        position={position}
      />
    ));
  };

  const onLayout = (event: any) => {
    if (event == null) return;

    event.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        //onUpdate("home", 0, { x, y, width, height, pageX, pageY });
      }
    );
  };

  switch (type) {
    case "empty":
      return <View ref={onLayout} style={styles.colMid} />;
      break;

    default:
      return <View style={styles.col}>{loadCell()}</View>;
  }
};

Column.prototype = {
  position: PropTypes.bool,
  type: PropTypes.string,
};

Column.defaultProps = {
  type: "default",
  cellList: [],
};

const styles = StyleSheet.create({
  col: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colEmpty: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    flex: 0.9,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colMid: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    flex: 0.58,
  },
});
