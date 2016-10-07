import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from './component-helpers';
import Modal from 'react-modal';
import Constants from '../reducers/firebase_constants';
import * as firebase from 'firebase';
import authActions from '../actions/auth';

class LoginNav extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.state = {
      modalOpen: false
    };
  }

  openModal() {
    this.setState({modalOpen: !this.state.modalOpen});
  }

  render() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '50%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '400px',
        'font-family'         : '"Josefin Sans", sans-serif'
      }
    };

    console.log("this.props.auth: ", this.props.auth);

    const p = this.props;
    const auth = p.auth;

    switch(auth.currently) {
      case Constants.LOGGED_IN:
        return (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Link to="/watchlist" className="btn btn-secondary">
                      My Watchlist
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-secondary"> Logout </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          )
      case Constants.AWAITING_AUTH_RESPONSE:
        return (
          <div>
          </div>
          )
      default:
        return (
            <div>
            <button className="btn btn-secondary" onClick={this.openModal}>
              Login
            </button>

            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.openModal}
              style={customStyles}
            >
              <h2> LOGIN </h2>
              <hr />
              <p> Please enter your username to login with your Google Account </p>
              <center>
                <button className="btn btn-primary" onClick={p.attemptLogin}> <h3>Login with Google+</h3></button>
              </center>
            </Modal>
          </div>
          )
    }
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: function() { dispatch(authActions.attemptLogin()); },
    logoutUser: function() { dispatch(authActions.logoutUser()); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginNav);
