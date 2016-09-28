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
            <div className="card col-md-12"><p>{stockData.short_description}</p></div>
            <div className="card col-md-12">Key Stats:</div>
          </div>
        </div>

        <div className="card-deck-wrapper">
          <div className="card-deck">
            <div className="card">52 week low: {stockData['52_week_low']}</div>
            <div className="card">52 week high: {stockData['52_week_high']}</div>
            <div className="card">Basic EPS: {stockData.basiceps}</div>
          </div>

          <div className="card-deck">
            <div className="card">Market Cap: {stockData.marketcap}</div>
            <div className="card">Volume: {stockData.volume}</div>
            <div className="card">Open Price: {stockData.open_price}</div>
          </div>

          <div className="card-deck">
            <div className="card">Close Price: {stockData.close_price}</div>
            <div className="card">Beta: {stockData.beta}</div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stockData: state.stock
  }
}

export default connect(mapStateToProps)(StockView);
