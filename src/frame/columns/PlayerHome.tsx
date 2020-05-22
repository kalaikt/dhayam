import React from "react";
import { Cell } from "../Cell";
import { View, StyleSheet } from "react-native";
import { getAllCells } from "../../constants";
import PropTypes from "prop-types";

export const PlayerHome = ({ position }: any) => {
    const loadCells = () => {
      const cells = getAllCells()[position];
      return cells.map((cell: any) => (
        <Cell
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
              /* onUpdate(pos, ind++, {
                x,
                y,
                width,
                height,
                pageX,
                pageY,
              }); */
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

  PlayerHome.prototype = {
    position: PropTypes.string
  };

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
  