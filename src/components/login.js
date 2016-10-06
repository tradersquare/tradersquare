import React, { Component } from 'react';
import {connect} from 'react-redux';
import Util from './component-helpers';
import Modal from 'react-modal';

export default class LoginNav extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.state = {modalOpen: false};
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
        width                 : '400px'
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
          </Modal>
        </div>
      )
  }
}
