import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import Util from './component-helpers';
import Modal from 'react-modal';
import Constants from '../reducers/firebase_constants';
import * as firebase from 'firebase';
import authActions from '../actions/auth';
import LoginPopup from './login_popup';
import addStock from '../actions/add_stock';

class LoginNav extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.logout = this.logout.bind(this);
    // this.loadWatchList = this.loadWatchlist.bind(this);
    this.state = {
      modalOpen: false,
      loadWatchList: true
    };
  }

  componentWillMount() {
    // this.props.addStock(null, this.props.watchlistData, this.props.auth.uid, true);
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
            <Link to="/watchlist" className="nav-link">
              My Watchlist
            </Link>
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
    auth: state.auth,
    watchlistData: state.watchList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  { attemptGoogleLogin: function() { dispatch(authActions.attemptGoogleLogin()) },
    logoutUser: function() { dispatch(authActions.logoutUser()); }
  },
    dispatch
  )};

export default connect(mapStateToProps, mapDispatchToProps)(LoginNav);
