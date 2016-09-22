import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';


class StockView extends Component {

  render() {
    console.log('mapStateToProps rerender: ', this.props.stockData);
    // let stockData = this.props.stockData.map((val) => {
    //   return (<div key={val}><span>{val[0]}</span> : <span>{val[1]}</span></div>);
    // }) put back in!!!!!

    return (
      <div>
      <SearchBar />
        {stockData}
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
