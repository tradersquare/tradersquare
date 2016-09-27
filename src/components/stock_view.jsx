import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';


class StockView extends Component {
    // constructor(props) {
    //   this.state
    // }

  render() {
    const stockData = this.props.stockData;
    console.log('asdfsdff', stockData);

    return (
      <div>
        <div className="row header">
          <h1 className="heading col-md-7"><Link to="/">TraderSquare</Link></h1>
          <div className="col-md-3 top-padding">
            <SearchBar/>
          </div>
          <div className="col-md-2 top-padding">
            <StratNav/>
          </div>
        </div>

        <div className="row">
          <h3>  {stockData.ticker} : {stockData.name} {stockData.open_price}</h3>
        </div>

        <div className="row">
          <img className="col-md-6" src="http://i.stack.imgur.com/OxwLO.png"/>
          <div className="col-md-6">
            <div className="col-md-12">{stockData.short_description}</div>
            <div className="col-md-12">Key Stats:</div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">52 week low: {stockData['52_week_low']}</div>
          <div className="col-md-4">52 week high: {stockData['52_week_high']}</div>
          <div className="col-md-4">Basic EPS: {stockData.basiceps}</div>
        </div>

        <div className="row">
          <div className="col-md-4">Market Cap: {stockData.marketcap}</div>
          <div className="col-md-4">Volume: {stockData.volume}</div>
          <div className="col-md-4">Open Price: {stockData.open_price}</div>
        </div>

        <div className="row">
          <div className="col-md-4">Close Price: {stockData.close_price}</div>
          <div className="col-md-4">Beta: {stockData.beta}</div>
        </div>

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
