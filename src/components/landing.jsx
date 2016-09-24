import React, { Component } from 'react';
import SearchBar from './search_bar';
import StrategyView from './strategy_view';
import StockView from './stock_view';



export default class Landing extends Component {
  render() {
    return (
      <div>
        <h1 className="heading"></h1>
        <SearchBar />
      </div>
    );
  }
}
