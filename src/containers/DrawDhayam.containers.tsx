import { connect } from "react-redux";
import * as CellActions from "../actions";
import { bindActionCreators } from "redux";
import DrawDhayam from "../views/dhayam/DrawDhayam";
import {
  getPlayer1TravelPath,
  getPlayer1Coins,
  getPlayer2Coins,
  getPlayer3Coins,
  getPlayer4Coins,
  getPlayer2TravelPath,
  getPlayer3TravelPath,
  getPlayer4TravelPath,
} from "../selecters";
import { getCurrentUser } from "../selecters/user.selecter";
import { getRoom } from "../selecters/room.selecter";

const mapStateToProps = (state: any) => ({
  travelPath: getPlayer1TravelPath(state),
  player1: {
    coins: getPlayer1Coins(state),
    travelPath: getPlayer1TravelPath(state),
    color: "#3366ff",
  },
  player2: {
    coins: getPlayer2Coins(state),
    travelPath: getPlayer2TravelPath(state),
    color: "#ff3399",
  },
  player3: {
    coins: getPlayer3Coins(state),
    travelPath: getPlayer3TravelPath(state),
    color: "#009900",
  },
  player4: {
    coins: getPlayer4Coins(state),
    travelPath: getPlayer4TravelPath(state),
    color: "#cc3300",
  },
  currentUser: getCurrentUser(state),
  room: getRoom(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawDhayam);
