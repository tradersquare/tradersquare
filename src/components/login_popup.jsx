import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import Util from './component-helpers';
import Modal from 'react-modal';
import Constants from '../reducers/firebase_constants';
import * as firebase from 'firebase';
import authActions from '../actions/auth';

class LoginPopup extends Component {
  constructor(props) {
    super(props);

    this.state ={
      google: new firebase.auth.GoogleAuthProvider()
    }

    this.attemptGoogleLogin = this.attemptGoogleLogin.bind(this);
  }

  attemptGoogleLogin() {
    console.log("logging in")
    return (dispatch, getState) => {
      dispatch({ type: Constants.ATTEMPTING_LOGIN });
      firebase.auth().signInWithPopup(this.state.google)
        .then((result) => {
          console.log(result.user.uid)
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


  render() {

    const buttonTextCenter = {
        'marginTop': '0.5rem'
    }

    return (
            <div>
              <h2> LOGIN </h2>
              <hr />
              <p> In order to see or add to your Watchlist, you must first signup or login below. </p>
              <button onClick={()=>console.log("clicked")}>test</button>
              <center>
                <button className="" onClick={this.attemptGoogleLogin}> <h3  style={buttonTextCenter}>Login with Google+</h3></button>
              </center>
            </div>
            )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attemptGoogleLogin: function() { dispatch(authActions.attemptGoogleLogin()); }
  }
}

export default connect(null, mapDispatchToProps)(LoginPopup);
