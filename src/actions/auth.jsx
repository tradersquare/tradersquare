import Constants from '../reducers/firebase_constants';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

const google = new firebase.auth.GoogleAuthProvider();

function attemptGoogleLogin() {
  return (dispatch, getState) => {
    dispatch({ type: Constants.ATTEMPTING_LOGIN });
    firebase.auth().signInWithPopup(google)
      .then((result) => {
        if (result) {
          dispatch({
            type: Constants.LOGIN_USER,
            uid: result.user.uid,
            username: result.user.displayName
          });
          browserHistory.push('/watchlist');
        }
      })
      .catch((error) => {
        dispatch({ type: Constants.LOGOUT })
        console.log("ERROR: ", error);
      })
  }
}

function logoutUser(path) {
  return (dispatch, getState) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: Constants.LOGOUT });
      })
  }
};

module.exports = {
  attemptGoogleLogin: attemptGoogleLogin,
  logoutUser: logoutUser
}
