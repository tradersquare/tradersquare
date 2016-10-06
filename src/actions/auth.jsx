import Constants from '../reducers/firebase_constants';
import firebase from 'firebase';

const fireRef = new firebase(Constants.FIREBASE);

export startListeningToAuth() => {
  return (dispatch, getState) => {
    fireRef.onAuth((authData) => {
      if (authData) {
        dispatch({
          type: Constants.LOGIN_USER,
          uid: authData.uid,
          username: authData.google.displayName || authData.google.username
        });
      } else {
        if (getState().auth.currently !== Constants.ANONYMOUS) {
          dispatch({ type: Constants.LOGOUT });
        }
      }
    }
  }
};

export attemptLogin() => {
  return (dispatch, getState) {
    dispatch({ type: Constants.ATTEMPTING_LOGIN });
    fireRef.authWithOAuthPopup("google", (error, authData) => {
      if (error) {
        dispatch({ type: Constants.DISPLAY_ERROR, error: `Login failed! Error: ${error}` });
        dispatch({ type: Constants.LOGOUT });
      }
    });
  }
}

export logoutUser() => {
  return function(dispatch, getState) {
    dispatch({ type: Constants.LOGOUT });
    fireRef.unauth();
  }
}
