import React from "react";
import { StyleSheet, View, Text } from "react-native";
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

  onPress(position: string, ind: any, layout: any) {
    this.props.onUpdate(position, ind, layout);
  }

  loadCell() {
    let cells = [];
    let key = "";

    if (this.props.position == "top") {
      cells = this.state.cellList.top;
      key = "topCell";
    } else {
      cells = this.state.cellList.bottom;
      key = "bottomCell";
    }

    return cells.map((cell: any) => (
      <Cell
        cellIndex={cell.cellIndex}
        onPress={this.onPress}
        showLocation={cell.location}
        key={key + cell.cellIndex}
        index={cell.cellIndex}
        position={this.props.position}
      />
    ));
  }
  render() {
    return <View style={styles.col}>{this.loadCell()}</View>;
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

  loadMidCell(isLeft: boolean) {
    let cells = [];
    let key = "";

    if (isLeft) {
      cells = this.state.cellList.left;
      key = "left";
    } else {
      cells = this.state.cellList.right;
      key = "right";
    }

    return cells.map((cell: any) => (
      <CellMid
        showLocation={cell.location}
        index={cell.cellIndex}
        isLeft={isLeft}
        cellIndex={cell.cellIndex}
        key={`${key}cellmid${cell.cellIndex}`}
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

export const ColEmpty = ({ isCenter, onUpdate }: any) => {
  const onLayout = (event: any) => {
    setTimeout(() => {
      if (event != null)
        event.measure(
          (
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number
          ) => {
            onUpdate("home", 0, { x, y, width, height, pageX, pageY });
          }
        );
    }, 50);
  };

  if (isCenter != "true") return <View style={styles.colEmpty} />;

  return <View ref={onLayout} style={styles.colMid} />;
};

export const StartingCells = ({ position, onUpdate }: any) => {
  const onPress = (isTop: boolean, ind: any, layout: any) => {
    onUpdate(position, ind, layout);
  };

  const loadCells = () => {
    const cells = allCells()[position];
    return cells.map((cell: any) => (
      <Cell
        cellIndex={cell.cellIndex}
        onPress={onPress}
        showLocation={cell.location}
        key={position + cell.cellIndex}
        index={cell.cellIndex}
        position={position}
      />
    ));
  };

  const buildColumn = () => {
    switch (position) {
      case "topLeft":
        return topLeft();
        break;
      case "topRight":
        return topRight();
        break;
      case "bottomLeft":
        return bottomLeft();
        break;
      case "bottomRight":
        return bottomRight();
        break;
      default:
        return topLeft();
    }
  };

  const buildCoin = () => {
    const pos = `${position}Home`;
    let ind = 0;
    const onLayout = (event: any) => {
      if (event == null) return;

      setTimeout(() => {
        event.measure(
          (
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number
          ) => {
            onUpdate(pos, ind++, {
              x,
              y,
              width,
              height,
              pageX,
              pageY,
            });
          }
        );
      }, 100);
    };

    return (
      <View style={styles.home} key={pos}>
        <View style={styles.homeRow}>
          <View ref={onLayout} style={styles.homeCell} />
          <View ref={onLayout} style={styles.homeCell} />
        </View>
        <View style={styles.homeRow}>
          <View ref={onLayout} style={styles.homeCell}>

          </View>
        </View>
        <View style={styles.homeRow}>
          <View ref={onLayout} style={styles.homeCell} />
          <View ref={onLayout} style={styles.homeCell} />
        </View>
      </View>
    );
  };

  const topLeft = () => {
    return (
      <View style={styles.topLeft}>
        <View style={styles.topLeftCell}>{loadCells()}</View>
        <View style={styles.topLeftHome}>{buildCoin()}</View>
      </View>
    );
  };
  const topRight = () => {
    return (
      <View style={styles.topRight}>
        {loadCells()}
        <View style={styles.topRightHome}>{buildCoin()}</View>
      </View>
    );
  };
  const bottomLeft = () => {
    return (
      <View style={styles.bottomLeft}>
        <View style={styles.bottomLeftHome}>{buildCoin()}</View>
        {loadCells()}
      </View>
    );
  };
  const bottomRight = () => {
    return (
      <View style={styles.bottomRight}>
        <View style={styles.bottomRightHome}>{buildCoin()}</View>
        <View style={styles.bottomRightCell}>{loadCells()}</View>
      </View>
    );
  };

  return buildColumn();
};

const allCells: any = () => {
  const left = [];
  const top = [];
  const bottom = [];
  const right = [];
  const topLeft = [];
  const topRight = [];
  const bottomLeft = [];
  const bottomRight = [];
  const coins = [];

  for (let i = 0; i < 25; i++) top.push({ location: false, cellIndex: i });
  for (let i = 0; i < 25; i++) bottom.push({ location: false, cellIndex: i });
  for (let i = 0; i < 15; i++) left.push({ location: false, cellIndex: i });
  for (let i = 0; i < 15; i++) right.push({ location: false, cellIndex: i });
  for (let i = 0; i < 5; i++) {
    topLeft.push({ location: false, cellIndex: i });
    coins.push({ location: false, cellIndex: i });
  }
  for (let i = 0; i < 4; i++) topRight.push({ location: false, cellIndex: i });
  for (let i = 0; i < 4; i++)
    bottomLeft.push({ location: false, cellIndex: i });
  for (let i = 0; i < 5; i++)
    bottomRight.push({ location: false, cellIndex: i });

  return {
    top,
    left,
    bottom,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    coins,
  };
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
    // alignItems: "flex-end",
  },
  colMid: {
    borderWidth: 0,
    borderColor: "#f00",
    borderStyle: "solid",
    flex: 0.58,
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
    //margin: 5
  },
});
