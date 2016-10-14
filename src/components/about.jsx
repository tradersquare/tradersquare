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
        <div className="">
        <p>Tradersquare was created to make stock analysis and stock picking more accessible to everyone. Pick stocks based on different metrics.
        <br/>
        Disclaimer: We are not making any investment recommendations, please invest at your own risk.
        </p>
        </div>

      <h1>Technology We Used</h1>
        <div className="row">

        <img className="react col-md-2 img-responsive" src="/images/react_logo.png" />

        <img className="redux col-md-2 img-responsive" src="/images/redux_logo.png"/>

        </div>

      <h1>The Team</h1>
      <br/><br/>
      <div className="row">

        <div className="col-md-3">
          <div className="col-md-12"><img src="https://scontent.fsnc1-4.fna.fbcdn.net/t31.0-8/1097031_10200347522719245_1948257329_o.jpg" className="photo"/></div>
          <h4 className="centertext col-md-12">Akul Aggarwal</h4>
        </div>

        <div className="col-md-3">
          <div className="col-md-12"><img src="https://scontent.fsnc1-4.fna.fbcdn.net/v/t1.0-0/p206x206/12004767_10205012077282135_8226365319641742061_n.jpg?oh=bcfd2da1cd903532720e0ad0ee41a29f&oe=58AD66C8" className="photo"/></div>
          <h4 className="centertext col-md-12">Angelina May</h4>

        </div>

        <div className="col-md-3">
          <div className="col-md-12"><img src="https://scontent.fsnc1-4.fna.fbcdn.net/v/t1.0-9/1004403_10151689873841068_1415876196_n.jpg?oh=b8f29232f90f96e00511c953e4e9a47e&oe=586CC0BB" className="photo" /></div>
          <h4 className="centertext col-md-12">Cindy Sun</h4>
        </div>


        <div className="col-md-3">
          <div className="col-md-12"><img src="https://scontent.fsnc1-4.fna.fbcdn.net/t31.0-8/10623510_10204591370197577_6605496669023337623_o.jpg" className="photo"/></div>
          <h4 className="centertext col-md-12">Chris Battenfield</h4>
        </div>

      </div>
      </div>
    )
  }
}

export default connect(null, {})(About);

