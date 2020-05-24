import React from "react";
import { StyleSheet, View } from "react-native";
import Cell from "../../../containers/Cells.container";
import PropTypes from "prop-types";
import { getAllCells } from "../../../constants";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as CellActions from "../../../actions";

const Column = ({ position, type, actions }: any) => {
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

    actions.updateCellLayout("home", 0, event);
  };

  switch (type) {
    case "empty":
      return <View ref={onLayout} style={styles.colMid} />;

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

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);
