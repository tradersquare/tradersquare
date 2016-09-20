import React, { Component } from 'react';
import {connect} from 'react-redux';
import {GetData} from '../actions/index.jsx';

class StockView extends Component {
  render() {
    return (
      <div>
        Google is doin' just fine yo.


      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stockData: state.request
  }
}

export default connect(mapStateToProps)(StockView);
