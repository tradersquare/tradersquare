import React, { Component } from 'react';
import {connect} from 'react-redux';
import Util from './component-helpers';
import Modal from 'react-modal';
import Constants from '../reducers/firebase_constants';
import firebase from 'firebase';

export default class LoginNav extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.state = {modalOpen: false};
  }

  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyA6iK01GbFJq4MNGD68ef4zhPQSRPow-I0",
      authDomain: "tradersquare-ed7bc.firebaseapp.com",
      databaseURL: "https://tradersquare-ed7bc.firebaseio.com",
      storageBucket: "tradersquare-ed7bc.appspot.com",
      messagingSenderId: "139146427287"
    };

    const firebaseApp = firebase.initializeApp(firebaseConfig);
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

    return(
        <div>
          <button className="btn btn-secondary" onClick={this.openModal}> Login </button>

          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.openModal}
            style={customStyles}
          >
            <h2> LOGIN </h2>
            <hr />
            <p> Please enter your username to login with your Google Account </p>

          </Modal>
        </div>
      )
  }
}
