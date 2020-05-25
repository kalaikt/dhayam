import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Row, RowMid } from "./frame/rows";
import MoveCoin from "./frame/MoveCoin";

const screen = Dimensions.get("window");

type props = {
  player1: any;
  player2: any;
  player3: any;
  player4: any;
  travelPath: any;
  actions: any;
};

type states = {
  player1: any;
  player2: any;
  player3: any;
  player4: any;
  travelPath: any;
};

class DrawDhayam extends React.Component<props, states> {
  constructor(props: any) {
    super(props);

    this.state = {
      player1: props.player1,
      player2: props.player2,
      player3: props.player3,
      player4: props.player4,
      travelPath: props.travelPath,
    };

    this.loadCoin = this.loadCoin.bind(this);
  }

  componentDidMount() {
    this.setState({
      player1: this.props.player1,
      travelPath: this.props.travelPath,
    });
  }

  loadCoin = (player: any) => {
    return player.coins.map((h: any, index: number) => (
      <MoveCoin
        coin={index}
        key={`player${index}`}
        layout={h.layout}
        travelPath={player.travelPath}
        color={player.color}
      />
    ));
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.loadCoin(this.state.player1)}
        {this.loadCoin(this.state.player2)}
        {this.loadCoin(this.state.player3)}
        {this.loadCoin(this.state.player4)}
        <View style={styles.playerSection}></View>
        <View style={styles.container}>
          <Row position="top" />
          <RowMid />
          <Row position="bottom" />
        </View>
        <View style={styles.playerSection}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screen.width < 1024 ? screen.width : 1024,
    height: screen.width < 1024 ? screen.width : 1024,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playerSection: {
    width: "100%",
    height: "20%",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
});

export default DrawDhayam;
