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
    <div className="landing">
      <div className="mdl-grid">
        <h1 className="landing-title">TraderSquare</h1>
      </div>

      <div className="mdl-grid">

        <div className="mdl-cell">
          <h2 className="centerheading">SEARCH STOCKS</h2>

          <div className="col-md-12"><p className="col-md-12 centertext">Enter any stock ticker to see it's most common metrics and breif descriptions for each metric.</p></div>

          <div className="row col-md-12">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <SearchBar/>
            </div>
            <div className="col-md-1"></div>
          </div>

        </div>

        <div className="mdl-cell">
          <h2 className="centerheading">EXPLORE BY METRIC</h2>

          <div className="col-md-12"><p className="col-md-12 centertext">See the best performing stocks in the S&P 500 based on your favorite metrics.</p></div>

          <div className="row col-md-12">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <button className="btn btn-secondary"><StratNav/></button>
            </div>
            <div className="col-md-4"></div>
          </div>

        </div>

        <div className="mdl-cell">
          <h2 className="centerheading">PICK STOCKS</h2>
          <div className="col-md-12"><p className="col-md-12 centertext">Pick stocks with your own set of criteria, with data from the S&P 500.</p></div>

          <div className="row col-md-12">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <button className="btn btn-secondary"><FilterNav/></button>
            </div>
            <div className="col-md-4"></div>
          </div>

        </div>

      </div>
      </div>

    );
  }
}
