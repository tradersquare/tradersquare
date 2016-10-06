import Constants from './firebase_constants';

const initialState = {
  currently: Constants.ANONYMOUS,
  username: null,
  uid: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case Constants.ATTEMPTING_LOGIN:
      return {
        currently: Constants.AWAITING_AUTH_RESPONSE,
        username: "guest",
        uid: null
      };
    case Constants.LOGOUT:
      return {
        currently: Constants.ANONYMOUS,
        username: "guest",
        uid: null
      };
    case Constants.LOGIN_USER:
      return {
        currently: Constants.LOGGED_IN,
        username: action.username,
        uid: action.uid
      };
    default: return state;
  }
}
