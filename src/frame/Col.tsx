import React from "react";
import { StyleSheet, View } from "react-native";
import { Cell, CellMid } from "./Cell";
import { ColMidProps, ColProps, ColState } from "./ColInterface";

export class Col extends React.Component<ColProps, ColState> {
  constructor(props: any) {
    super(props);
    this.state = {
      cellList: allCells(),
      diceValue: props.diceValue,
      prevValue: 0,
    };
    this.onPress = this.onPress.bind(this);
    this.loadCell = this.loadCell.bind(this);
  }

  onPress(isTop: boolean, ind: any, layout: any) {
    this.props.onUpdate(isTop ? "top" : "bottom", ind, layout);

    if (isTop) {
      this.state.cellList.top[ind].layout = layout;
      this.setState({ cellList: this.state.cellList });
    } else {
      this.state.cellList.bottom[ind].layout = layout;
      this.setState({ cellList: this.state.cellList });
    }

    this.forceUpdate();
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    /* const value = this.state.prevValue + nextProps.diceValue;
    const cells = allCells();
    const path = TravelPath.playars[0][value];

    cells[path.location][path.position].location = true;
    this.setState({ cellList: cells, prevValue: value }); */
  }

  loadCell(cellsCount: Number, isTop: boolean) {
    let cells = [];

    if (!isTop)
      return this.state.cellList.bottom.map((cell: any) => (
        <Cell
          cellIndex={cell.cellIndex}
          onPress={this.onPress}
          showLocation={cell.location}
          key={"bottomCell" + cell.cellIndex}
          index={cell.cellIndex}
          isTop={isTop}
        ></Cell>
      ));

    return this.state.cellList.top.map((cell: any) => (
      <Cell
        cellIndex={cell.cellIndex}
        onPress={this.onPress}
        showLocation={cell.location}
        key={"topCell" + cell.cellIndex}
        index={cell.cellIndex}
        isTop={isTop}
      />
    ));
  }
  render() {
    return (
      <View style={styles.col}>
        {this.loadCell(this.props.cells, this.props.isTop)}
      </View>
    );
  }
}

export class ColMid extends React.Component<ColMidProps, ColState> {
  constructor(props: any) {
    super(props);
    this.state = {
      cellList: allCells(),
      diceValue: props.diceValue,
      prevValue: 0,
    };
    this.onPress = this.onPress.bind(this);
    this.loadMidCell = this.loadMidCell.bind(this);
  }

  onPress(isLeft: boolean, ind: any, layout: any) {
    this.props.onUpdate(isLeft ? "left" : "right", ind, layout);

    if (isLeft) {
      this.state.cellList.left[ind].layout = layout;
      this.setState({ cellList: this.state.cellList });
    } else {
      this.state.cellList.right[ind].layout = layout;
      this.setState({ cellList: this.state.cellList });
    }

    this.forceUpdate();
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    /* const value = this.state.prevValue + nextProps.diceValue;
    const cells = allCells();
    const path = TravelPath.playars[0][value];

    cells[path.location][path.position].location = true;
    this.setState({ cellList: cells, prevValue: value }); */
  }

  loadMidCell(isLeft: boolean) {
    if (!isLeft)
      return this.state.cellList.right.map((cell: any) => (
        <CellMid
          showLocation={cell.location}
          index={cell.cellIndex}
          isLeft={isLeft}
          cellIndex={cell.cellIndex}
          key={"cellmid" + cell.cellIndex}
          onPress={this.onPress}
        />
      ));

    return this.state.cellList.left.map((cell: any) => (
      <CellMid
        showLocation={cell.location}
        index={cell.cellIndex}
        isLeft={isLeft}
        cellIndex={cell.cellIndex}
        key={"cellmid" + cell.cellIndex}
        onPress={this.onPress}
      />
    ));
  }

  render() {
    return (
      <View style={styles.col}>{this.loadMidCell(this.props.isLeft)}</View>
    );
  }
}

export const ColEmpty = ({ isCenter }: any) => {
  return (
    <View style={[isCenter == "true" ? styles.colMid : styles.colEmpty]} />
  );
};

const allCells: any = () => {
  const left = [];
  const top = [];
  const bottom = [];
  const right = [];

  for (let i = 0; i < 25; i++) top.push({ location: false, cellIndex: i });
  for (let i = 0; i < 25; i++) bottom.push({ location: false, cellIndex: i });
  for (let i = 0; i < 15; i++) left.push({ location: false, cellIndex: i });
  for (let i = 0; i < 15; i++) right.push({ location: false, cellIndex: i });

  return { top, left, bottom, right };
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
    flex: 0.54,
  },
  width: {
    flexBasis: "35%",
  },
});
