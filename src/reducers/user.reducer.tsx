import { ADD_USER } from "../constants/ActionTypes";

const initialState: any = {};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_USER:
      return {...state, username: action.name };

    default:
      return state;
  }
}
