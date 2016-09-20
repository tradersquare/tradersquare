import React, { Component } from 'react';
import {connect} from 'react-redux';
import {GetData} from '../actions/index.jsx';

class StockView extends Component {

  render() {
    console.log('mapStateToProps rerender: ', this.props.stockData)
    return (
      <div>
        Google is doin' just fine yo.
        {this.props.stockData[0].title }

      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps state: ', state);
  return {
    stockData: state.stock
  }
}

export default connect(mapStateToProps)(StockView);
