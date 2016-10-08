import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import Header from './header'

class About extends Component {

  render() {
    return (
      <div className="pushdown-md">
      <Header />
      <h1>About Tradersquare</h1>
        <div className="">
        <p>Tradersquare was created to make stock analysis and stock picking more accessible to everyone.
        <br/>
        blah blah add more
        </p>
        </div>

      <h1>Technology We Used</h1>
        <div className="row">

        <img className="react col-md-2" src="https://camo.githubusercontent.com/de1aee8ba4b47ab028766f2fd83b777715b88c3b/68747470733a2f2f73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f7374616e6c65796379616e672d76322f72656163742d6f7074692e706e672d31373337633838616364656463643366623531336466623866333338623634656634356364313561" />

        <img className="redux col-md-2" src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png"/>

        </div>

      <h1>The Team</h1>
        <div className="row">
        <div className="col-md-3">Akul</div>
        <div className="col-md-3">Angelina</div>
        <div className="col-md-3">Cindy</div>
        <div className="col-md-3">Chris</div>

        </div>
      </div>
    )
  }
}

export default connect(null, {})(About);
