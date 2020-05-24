import React from "react";
import Cell from "../../../containers/Cells.container";
import { View, StyleSheet } from "react-native";
import { getAllCells } from "../../../constants";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as CellActions from "../../../actions";

type props = {
  position: string;
  actions: any;
};

class PlayerHome extends React.Component<props> {
  constructor(props: props) {
    super(props);

    this.buildColumn = this.buildColumn.bind(this);
    this.buildCoin = this.buildCoin.bind(this);
    this.topLeft = this.topLeft.bind(this);
    this.topRight = this.topRight.bind(this);
    this.bottomLeft = this.bottomLeft.bind(this);
    this.bottomRight = this.bottomRight.bind(this);
    this.buildCoin = this.buildCoin.bind(this);
  }

  buildColumn = () => {
    switch (this.props.position) {
      case "topLeft":
        return this.topLeft();
      case "topRight":
        return this.topRight();
      case "bottomLeft":
        return this.bottomLeft();
      case "bottomRight":
        return this.bottomRight();
      default:
        return this.topLeft();
    }
  };

  buildCoin = () => {
    const pos = `${this.props.position}Home`;
    let ind = 0;
    const onLayout = (event: any) => {
      if (event == null) return;
      this.props.actions.updateHomeCellLayout(pos, ind++, event);
    };

    return (
      <View style={styles.home} key={pos}>
        <View style={styles.homeRow}>
          <View ref={onLayout} style={styles.homeCell} />
          <View ref={onLayout} style={styles.homeCell} />
        </View>
        <View style={styles.homeRow}>
          <View ref={onLayout} style={styles.homeCell}></View>
        </View>
        <View style={styles.homeRow}>
          <View ref={onLayout} style={styles.homeCell} />
          <View ref={onLayout} style={styles.homeCell} />
        </View>
      </View>
    );
  };

  topLeft = () => {
    return (
      <View style={styles.topLeft}>
        <View style={styles.topLeftCell}>{this.loadCells()}</View>
        <View style={styles.topLeftHome}>{this.buildCoin()}</View>
      </View>
    );
  };
  topRight = () => {
    return (
      <View style={styles.topRight}>
        {this.loadCells()}
        <View style={styles.topRightHome}>{this.buildCoin()}</View>
      </View>
    );
  };
  bottomLeft = () => {
    return (
      <View style={styles.bottomLeft}>
        <View style={styles.bottomLeftHome}>{this.buildCoin()}</View>
        {this.loadCells()}
      </View>
    );
  };
  bottomRight = () => {
    return (
      <View style={styles.bottomRight}>
        <View style={styles.bottomRightHome}>{this.buildCoin()}</View>
        <View style={styles.bottomRightCell}>{this.loadCells()}</View>
      </View>
    );
  };

  loadCells = () => {
    const { position } = this.props;
    const cells = getAllCells()[position];
    return cells.map((cell: any) => (
      <Cell
        key={position + cell.cellIndex}
        index={cell.cellIndex}
        position={position}
      />
    ));
  };

  render() {
    return this.buildColumn();
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerHome);

const styles = StyleSheet.create({
  topLeft: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    flex: 0.81,
    paddingLeft: 25,
    display: "flex",
    flexDirection: "row",
  },
  topRight: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    flex: 0.81,
    flexDirection: "row",
    paddingRight: 25,
    flexWrap: "wrap",
  },
  bottomLeft: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    flex: 0.81,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingLeft: 25,
    flexWrap: "wrap",
  },
  topLeftHome: {
    borderWidth: 0,
    width: "75%",
    height: "100%",
    padding: 10,
    paddingTop: 0,
  },
  topLeftCell: {
    borderWidth: 0,
    width: "25%",
    height: "100%",
  },
  topRightHome: {
    borderWidth: 0,
    width: "100%",
    height: "80%",
    padding: 10,
    paddingRight: 0,
  },
  bottomLeftHome: {
    borderWidth: 0,
    width: "100%",
    height: "80%",
    padding: 10,
    paddingLeft: 0,
  },
  bottomRightHome: {
    borderWidth: 0,
    width: "75%",
    height: "100%",
    padding: 10,
    paddingBottom: 0,
  },
  bottomRightCell: {
    borderWidth: 0,
    width: "25%",
    height: "100%",
  },
  bottomRight: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    flex: 0.81,
    paddingRight: 25,
    display: "flex",
    flexDirection: "row",
  },
  width: {
    flexBasis: "35%",
  },
  home: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderWidth: 0,
  },
  homeCell: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 20,
    margin: 2,
  },
  homeRow: {
    flex: 1,
    borderWidth: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
});
