import React, { Component } from 'react';
import {connect} from 'react-redux';
import Util from './component-helpers';
import Modal from 'react-modal';

export default class LoginNav extends Component {
  render() {
    return(
        <div>
          <button className="btn btn-secondary"> Login </button>
        </div>
      )
  }
}
