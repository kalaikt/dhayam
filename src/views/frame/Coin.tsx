import {
  Animated,
  StyleSheet,
  Dimensions,
  Easing,
  Text,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as CellActions from "../../actions";
import { getCellsLayout, getLayout, getCurrentUser } from "../../selecters";
import { socket } from "../../client";
import { SAFEZONE, HOMES } from "../../constants";

type states = {
  pan: Animated.ValueXY;
  value: any;
  showIcon: boolean;
  cellsLayout: any;
  travelPath: any;
  dice: any;
  dialed: boolean;
  players: any;
};
interface props {
  coinIndex: number;
  layout: any;
  cellsLayout: any;
  travelPath: any;
  color: string;
  isCurrentUser: boolean;
  actions: any;
  nextCellLayout: any;
  playerName: string;
  currentUser: any;
  noOfPlayers: number;
}
let size = 40;

interface CoinType {
  location: string;
  index: number;
}

class Coin extends React.Component<props, states> {
  travelIndex = 0;
  animate = React.createRef();
  dy = 0;
  screen = Dimensions.get("screen");
  private players = [];
  private coin: CoinType = { location: "", index: -1 };

  constructor(props: any) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
      value: { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 },
      showIcon: false,
      cellsLayout: props.cellsLayout,
      travelPath: props.travelPath,
      dice: {},
      dialed: false,
      players: [],
    };

    this.moveCoin = this.moveCoin.bind(this);
  }

  nextPlayer = (diceNumber: number) => {
    if (this.travelIndex == 0) this.setState({ dialed: false });
    if (![1, 5, 6].includes(diceNumber)) {
      this.setState({ dialed: false });
      socket.emit("switchToNextPlayer", this.props.playerName);
    }
  };

  isSafeZone = (location: string, index: number) => {
    return SAFEZONE.filter(
      (zone: any) => zone.location == location && zone.index == index
    ).length;
  };

  move(value: number, ind = 0) {
    if (value == ind) {
      this.state.pan.setValue(this.state.value);
      const { location, index } = this.props.travelPath[this.travelIndex - 1];
      this.coin = { location, index };
      socket.emit(
        "checkCoinLocation",
        this.props.playerName,
        location,
        index,
        this.travelIndex - 1
      );
      /* let checkOtherPlrsCoinPos = [];
      if (
        this.props.currentUser.username == this.props.playerName &&
        !this.isSafeZone(location, index) &&
        !HOMES.includes(location)
      ) {
        this.players.forEach((player: any) => {
          if (this.props.playerName == player.username) return;
          console.log(player.coins);
          console.log(location, index);
          checkOtherPlrsCoinPos = player.coins.filter(
            (coin: any) =>
              coin.location == location &&
              coin.cellIndex == index &&
              (this.travelIndex - 1 > 11 || coin.currentPosition > 11)
          );

          if (checkOtherPlrsCoinPos.length) {
            console.log(checkOtherPlrsCoinPos);
            checkOtherPlrsCoinPos.forEach((coin: any) => {
              socket.emit("cutAndMoveToHome", player.username, coin.coinIndex);
            });
          }
        });
      }
*/
      if (this.props.currentUser.username == this.props.playerName) {
        socket.emit(
          "updateCoinPosition",
          this.props.playerName,
          this.props.coinIndex,
          location,
          index,
          this.travelIndex - 1
        );
      }

      this.nextPlayer(value);
      return;
    }

    const { location, index } = this.props.travelPath[this.travelIndex];
    this.travelIndex++;

    this.props.actions.setCellLocation(location, index).then((data: any) => {
      this.props.nextCellLayout.measure(
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

  moveCoin() {
    if (
      !this.props.isCurrentUser ||
      this.props.currentUser.username != this.state.dice.playerName
    )
      return;

    const { value } = this.state.dice;

    if (this.travelIndex == 0 && value != 1) return;
    if (this.travelIndex + value <= this.props.travelPath.length) {
      socket.emit(
        "updatePosition",
        this.props.playerName,
        this.props.coinIndex,
        value
      );
    }
  }

  componentWillUnmount() {
    socket.off("moveCoin");
    socket.off("getDiceValue");
    socket.off("updatePosition");
    socket.off("switchToNextPlayer");
    socket.off("cutAndMoveToHome");
    socket.off("getPlayers");
  }

  componentDidMount() {
    setTimeout(() => {
      this.moveToHome();
    }, 1000);

    socket.on(
      "checkCoinLocation",
      (player: string, location: string, index: number, coinIndex: number) => {
        if (
          this.coin.location == location &&
          this.coin.index == index &&
          player != this.props.playerName &&
          !this.isSafeZone(location, index) &&
          !HOMES.includes(location) &&
          (this.travelIndex - 1 > 11 || coinIndex > 11)
        ) {
          socket.emit(
            "cutAndMoveToHome",
            this.props.playerName,
            this.props.coinIndex
          );
        }
      }
    );

    socket.on("cutAndMoveToHome", (player: string, coinIndex: number) => {
      if (
        player == this.props.playerName &&
        this.props.coinIndex == coinIndex
      ) {
        this.moveToHome(true);
      }
    });

    socket.on(
      "moveCoin",
      (player: any, coinIndex: number, diceNumber: number) => {
        if (
          player === this.props.playerName &&
          this.props.coinIndex === coinIndex &&
          this.travelIndex + diceNumber <= this.props.travelPath.length
        ) {
          this.move(diceNumber);
        }
      }
    );

    socket.on(
      "getDiceValue",
      (playerName: string, value: number, players: any) => {
        if (
          playerName == this.props.currentUser.username &&
          this.props.playerName == playerName
        ) {
          this.doAutoPlay(value, players);
        }

        this.players = players;

        this.setState({
          players,
          dice: {
            playerName,
            value,
          },
          dialed:
            this.props.currentUser.username == playerName &&
            this.travelIndex + value <= this.props.travelPath.length &&
            (value == 1 || this.travelIndex >= 1)
              ? true
              : false,
        });
      }
    );
  }

  getCoins = (players: any) => {
    const [player] = players.filter(
      (player: any) => player.username == this.props.currentUser.username
    );

    return player.coins;
  };

  doAutoPlay = (diceNumber: number, players: any) => {
    const currentPlayerCoins = this.getCoins(players);

    const coins = currentPlayerCoins.filter(
      (coin: any) =>
        coin.currentPosition != -1 &&
        coin.currentPosition != this.props.travelPath.length - 1
    );

    if (
      !coins.length ||
      (this.hasCoinAtHome(currentPlayerCoins) && diceNumber == 1)
    )
      return;

    const [coin] = coins;
    if (
      (coins.length == 1 && coin.coinIndex == this.props.coinIndex) ||
      (this.isCoinsAtSamePosition(coins) &&
        this.props.coinIndex == this.pickCoin(currentPlayerCoins))
    ) {
      socket.emit(
        "updatePosition",
        this.props.playerName,
        this.props.coinIndex,
        diceNumber
      );
    }
  };

  hasCoinAtHome = (coins: any) => {
    return coins.filter((coin: any) => coin.currentPosition == -1).length;
  };

  pickCoin = (coins: any) => {
    return coins.findIndex(
      (coin: any) =>
        coin.currentPosition != -1 &&
        coin.currentPosition != this.props.travelPath.length - 1
    );
  };

  isCoinsAtSamePosition = (coins: any) => {
    let tmpCoins: any = new Set(coins);
    const duplicates: any = [];
    const original: any = new Set(coins);

    do {
      const iterator = tmpCoins.values();
      const c = iterator.next().value;

      const samePositionCoins = coins.filter(
        (coin: any) => coin.currentPosition == c.currentPosition
      );

      original.forEach((coin: any) => {
        if (coin.currentPosition == c.currentPosition) tmpCoins.delete(coin);
      });

      duplicates.push(samePositionCoins.length);
    } while (tmpCoins.size);

    return duplicates.length == 1;
  };

  moveToHome = (isCoinCut: boolean = false) => {
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

    if (isCoinCut) {
      this.coin.location = "";
      this.coin.index = -1;
      socket.emit(
        "updateCoinPosition",
        this.props.playerName,
        this.props.coinIndex,
        "",
        -1,
        -1
      );
    }

    this.travelIndex = 0;
  };

  render() {
    if (this.screen.width < 450) size = 20;

    return (
      <Animated.View style={[this.state.pan.getLayout(), styles.coin]}>
        {/* <Text>{this.props.playerName}</Text> */}
        {this.props.isCurrentUser && this.state.dialed && (
          <View style={styles.dialed} />
        )}
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
    alignItems: "center",
    justifyContent: "center",
  },
  dialed: {
    width: size * 0.3,
    height: size * 0.3,
    borderWidth: 1,
    borderRadius: (size * 0.3) / 2,
    bottom: -3,
    position: "absolute",
  },
});

const mapStateToProps = (state: any) => ({
  cellsLayout: getCellsLayout(state),
  nextCellLayout: getLayout(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Coin);
