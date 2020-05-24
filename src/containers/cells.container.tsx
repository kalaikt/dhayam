import { connect } from "react-redux";
import * as CellActions from "../actions";
import { bindActionCreators } from "redux";
import Cell from "../views/frame/Cell";

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CellActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
