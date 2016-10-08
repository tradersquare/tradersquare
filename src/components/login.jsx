import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import Util from './component-helpers';
import Modal from 'react-modal';
import Constants from '../reducers/firebase_constants';
import * as firebase from 'firebase';
import authActions from '../actions/auth';
import LoginPopup from './login_popup';

class LoginNav extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      modalOpen: false
    };
  }

  openModal() {
    this.setState({modalOpen: !this.state.modalOpen});
  }

  logout() {
    if (this.state.modalOpen) {
      this.setState({modalOpen: !this.state.modalOpen});
    }
    this.props.logoutUser();
    if (location.pathname === '/watchlist') {
      browserHistory.push('/');
    }
  }

  render() {
    const p = this.props;
    const auth = p.auth;

    const modalStyles = {
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

    switch(auth.currently) {
      case Constants.LOGGED_IN:
        return (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Link to="/watchlist" className="nav-link">
                      My Watchlist
                    </Link>
                  </td>
                  <td>
                    <a className="nav-link" onClick={this.logout}> Logout </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          )
      case Constants.AWAITING_AUTH_RESPONSE:
        return (
            <div>
            <a className="nav-link" onClick={this.openModal}>
              My Watchlist
            </a>

            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.openModal}
              style={modalStyles}
            >
              <h2> LOGIN </h2>
              <hr />
              <p> Awaiting Authorization... </p>
              <center>
                <button className="btn btn-secondary" onClick={this.openModal}> Cancel </button>
              </center>
            </Modal>
          </div>
          )
      default:
        return (
            <div>
            <a className="nav-link" onClick={this.openModal}>
              My Watchlist
            </a>
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.openModal}
              style={modalStyles}
            >
              <LoginPopup />
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
    attemptGoogleLogin: function() { dispatch(authActions.attemptGoogleLogin()); },
    logoutUser: function() { dispatch(authActions.logoutUser()); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginNav);
