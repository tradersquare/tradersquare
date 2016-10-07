import Constants from '../reducers/firebase_constants';
import * as firebase from 'firebase';

const google = new firebase.auth.GoogleAuthProvider();

// function startListeningToAuth() {
//   return (dispatch, getState) => {
//     firebase.onAuth((authData) => {
//       if (authData) {
//         dispatch({
//           type: Constants.LOGIN_USER,
//           uid: authData.uid,
//           username: authData.google.displayName || authData.google.username
//         });
//       } else {
//         if (getState().auth.currently !== Constants.ANONYMOUS) {
//           dispatch({ type: Constants.LOGOUT });
//         }
//       }
//     })
//   }
// };

function attemptLogin() {
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(google)
      .then((result) => {
        console.log(result);
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
      //   } else {
      //   if (getState().auth.currently !== Constants.ANONYMOUS) {
      //     dispatch({ type: Constants.LOGOUT });
      //   }
      // }
      // }) (error, result) => {
      // if (error) {
      //   dispatch({ type: Constants.DISPLAY_ERROR, error: `Login failed! Error: ${error}` });
      //   dispatch({ type: Constants.LOGOUT });
      // }
  }
}

function logoutUser() {
  return (dispatch, getState) => {
    dispatch({ type: Constants.LOGOUT });
    firebase.unauth();
  }
};

module.exports = {
  // startListeningToAuth: startListeningToAuth,
  attemptLogin: attemptLogin,
  logoutUser: logoutUser
}
