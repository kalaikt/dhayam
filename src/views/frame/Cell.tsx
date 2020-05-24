import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type props = {
  position: string;
  index: number;
  actions: any;
};

type states = {
  cell: any;
};

class Cell extends React.Component<props, states> {
  cell: any = React.createRef();
  constructor(props: props) {
    super(props);

    this.cellHandler = this.cellHandler.bind(this);
  }

  cellHandler = (event: any) => {
    if (event == null) return;

    const { position, index, actions } = this.props;
    actions.updateCellLayout(position, index, event);
  };

  render() {
    const { position, index } = this.props;
    const colIngore = ["top", "bottom"];
    const style =
      (position == "topLeft" || position == "bottomRight") && styles.w100;

    switch (position) {
      case "left":
      case "right":
        return (
          <View ref={this.cellHandler} style={styles.cellMid}>
            {addStar(position, index)}
          </View>
        );

      default:
        return (
          <View
            ref={this.cellHandler}
            style={[
              styles.cell,
              (index % 5 >= 1 && index % 5 <= 3) ||
              (position == "top" && topPos.indexOf(index + 1) != -1) ||
              (position != "top" && bottomPos.indexOf(index + 1) != -1)
                ? styles.show
                : styles.hide,
              !colIngore.includes(position) && styles.startingCell,
              style,
              ((position == "top" && topPos.indexOf(index + 1) != -1) ||
                (position != "top" && bottomPos.indexOf(index + 1) != -1)) &&
                styles.shadow,
            ]}
          >
            {addStar(position, index)}
          </View>
        );
    }
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
    borderColor: "#b3b3b3",
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
  shadow: {
    borderColor: "#b3b3b3",
  },
  w100: {
    width: "100%",
  },
});

export default Cell;
