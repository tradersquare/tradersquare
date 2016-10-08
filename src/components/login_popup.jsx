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
  }


  render() {

    const buttonTextCenter = {
        'marginTop'      : '0.5rem'
    }

    return (
            <div>
              <h2> LOGIN </h2>
              <hr />
              <p> In order to see or add to your Watchlist, you must first signup or login below. </p>
              <center>
                <button className="btn btn-primary" onClick={this.props.attemptGoogleLogin}> <h3  style={buttonTextCenter}>Login with Google+</h3></button>
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
