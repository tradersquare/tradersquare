import Constants from '../reducers/firebase_constants';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

const google = new firebase.auth.GoogleAuthProvider();

function attemptLogin() {
  return (dispatch, getState) => {
    dispatch({ type: Constants.ATTEMPTING_LOGIN });
    firebase.auth().signInWithPopup(google)
      .then((result) => {
        if (result) {
          dispatch({
            type: Constants.LOGIN_USER,
            uid: result.uid,
            username: result.displayName
          });
        }
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      })
  }
}

function logoutUser(path) {
  return (dispatch, getState) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: Constants.LOGOUT });
        if (path === '/watchlist'){
          browserHistory.push('/');
        }
      })
  }
};

module.exports = {
  // startListeningToAuth: startListeningToAuth,
  attemptLogin: attemptLogin,
  logoutUser: logoutUser
}
