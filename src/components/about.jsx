import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import Header from './header'

class About extends Component {

  render() {
    return (
      <div className="">
      <Header />
      <h1>About Tradersquare</h1>
        <div className="row">

        </div>

      <h1>Technology We Used</h1>
        <div className="row">

        </div>

      <h1>The Team</h1>
        <div className="row">

        </div>
      </div>
    )
  }
}

export default connect(null, {})(About);
