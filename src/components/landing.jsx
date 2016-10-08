import React, { Component } from 'react';
import SearchBar from './search_bar';
import StrategyView from './strategy_view';
import StockView from './stock_view';
import {Link} from 'react-router';
import StratNav from './strategy_nav';
import FilterNav from './filter_nav';
import Header from './header'

export default class Landing extends Component {
  render() {
    return (
      <div>
      <Header />
      <div className="landing-container">

          <div className="landing-input">
          <h1 className="landing-header">TraderSquare</h1>
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <SearchBar/>
              <br/>
              <StratNav/>
              <br/>
              <FilterNav/>
            </div>
            <div className="col-md-3"></div>

          </div>

      </div>
      </div>

    );
  }
}
