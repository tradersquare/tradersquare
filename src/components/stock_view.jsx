import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddToWatchList from '../actions/watchlist_add';
import {Link} from 'react-router';

class StockView extends Component {

  render() {
    console.log('mapStateToProps rerender: ', this.props.stockData);
    return (
      <div>
        Google is doin' just fine yo.
        {this.props.stockData[0]['52_week_high']}
        <button onSubmit={this.props.AddToWatchList}>Add to Watch List </button>
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

export default connect(mapStateToProps, {AddToWatchList})(StockView);
