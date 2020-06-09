import { Animated, StyleSheet, Dimensions, Easing, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as CellActions from "../../actions";
import { getCellsLayout, getLayout, getCurrentUser } from "../../selecters";
import { socket } from "../../client";

type states = {
  pan: Animated.ValueXY;
  value: any;
  showIcon: boolean;
  cellsLayout: any;
  travelPath: any;
  dice: any;
};
interface props {
  coin: number;
  layout: any;
  cellsLayout: any;
  travelPath: any;
  color: string;
  isCurrentUser: boolean;
  actions: any;
  coinLayout: any;
  playerName: string;
  currentUser: any;
  noOfPlayers: number;
}

class MoveCoin extends React.Component<props, states> {
  travelIndex = 0;
  animate = React.createRef();
  dy = 0;
  screen = Dimensions.get("screen");

  constructor(props: any) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
      value: { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 },
      showIcon: false,
      cellsLayout: props.cellsLayout,
      travelPath: props.travelPath,
      dice: {},
    };

    this.moveCoin = this.moveCoin.bind(this);
  }

  nextPlayer = (diceNumber: number) => {
    if (![1, 5, 6].includes(diceNumber)) {
      socket.emit("switchToNextPlayer", this.props.playerName);
    }
  };

  move(value: number, ind = 0) {
    if (value == ind) {
      this.state.pan.setValue(this.state.value);
      this.nextPlayer(value);
      return;
    }

    const { location, index } = this.props.travelPath[this.travelIndex];
    this.travelIndex++;

    this.props.actions.setCellLocation(location, index).then((data: any) => {
      this.props.coinLayout.layout.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          const dx = width * 0.15;
          const dy =
            this.screen.width > 414 ? -(height * 0.1) : -(height * 0.1);
          const tovalue = {
            x: pageX + dx,
            y: pageY + dy,
          };

          this.setState({ value: tovalue });
          Animated.sequence([
            Animated.timing(this.state.pan, {
              delay: 10,
              toValue: this.state.value,
              duration: 300,
            }) /* ,
            Animated.timing(this.state.pan, {
              toValue: this.state.value,
            }), */,
          ]).start(() => this.move(value, ++ind));
        }
      );
    });
  }

  moveCoin(event: any) {
    if (
      !this.props.isCurrentUser ||
      this.props.currentUser.username != this.state.dice.playerName
    )
      return;

    const { value } = this.state.dice;
    console.log(value);
    if (this.travelIndex == 0 && value != 1) return;
    if (this.travelIndex + value <= this.props.travelPath.length) {
      socket.emit(
        "updatePosition",
        this.props.playerName,
        this.props.coin,
        value
      );
    }
  }

  componentWillUnmount() {
    socket.off("moveCoin");
    socket.off("getDiceValue");
    socket.off("updatePosition");
    socket.off("switchToNextPlayer");
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.layout.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          let dx = 20;
          let dy = -20;
          if (this.screen.width < 450) {
            dx = 10;
            dy = -15;
          }

          this.state.pan.setValue({
            x: pageX + width / 2 - dx,
            y: pageY + height / 2 + dy,
          });

          this.setState({ showIcon: true });
        }
      );
    }, 1000);

    socket.on(
      "moveCoin",
      (player: any, coinIndex: number, diceNumber: number) => {
        if (player === this.props.playerName && this.props.coin === coinIndex) {
          this.move(diceNumber);
        }
      }
    );

    socket.on("getDiceValue", (playerName: string, value: number) => {
      this.setState({
        dice: {
          playerName,
          value,
        },
      });
    });
  }

  render() {
    let size = 40;
    if (this.screen.width < 450) size = 20;
    return (
      <Animated.View style={[this.state.pan.getLayout(), styles.coin]}>
        {/* <Text>{this.props.playerName}</Text> */}
        {this.state.showIcon && this.props.isCurrentUser && (
          <Icon
            name="location-on"
            size={size}
            onPress={this.moveCoin}
            color={this.props.color}
          />
        )}

        {this.state.showIcon && !this.props.isCurrentUser && (
          <Icon name="location-on" size={size} color={this.props.color} />
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  coin: {
    position: "absolute",
    zIndex: 200,
  },
});

const mapStateToProps = (state: any) => ({
  cellsLayout: getCellsLayout(state),
  coinLayout: getLayout(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoveCoin);
