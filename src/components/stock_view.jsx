import React, { Component } from 'react';
import {connect} from 'react-redux';
// import AddToWatchList from '../actions/watchlist_add';
import {Link} from 'react-router';

class StockView extends Component {

  render() {
    console.log('mapStateToProps rerender: ', this.props.stockData);
    let stockData = this.props.stockData.map((val) => {
      return (<div key={val}><span>{val[0]}</span> : <span>{val[1]}</span></div>);
    })

    return (
      <div>
        Google is doin' just fine yo.
        {stockData}
        {/* <button onSubmit={this.props.AddToWatchList}>Add to Watch List </button> */}
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
