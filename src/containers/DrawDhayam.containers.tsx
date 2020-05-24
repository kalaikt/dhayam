import { connect } from "react-redux";
import * as CellActions from "../actions";
import { bindActionCreators } from "redux";
import DrawDhayam from "../views/DrawDhayam";
import {
  getPlayer1TravelPath,
  getPlayer1Coins,
  getPlayer2Coins,
  getPlayer3Coins,
  getPlayer4Coins,
} from "../selecters";

const mapStateToProps = (state: any) => ({
  travelPath: getPlayer1TravelPath(state),
  player1: getPlayer1Coins(state),
  player2: getPlayer2Coins(state),
  player3: getPlayer3Coins(state),
  player4: getPlayer4Coins(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawDhayam);
