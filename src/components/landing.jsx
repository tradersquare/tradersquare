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
      {/*<Header />*/}
      <div className=" row landing-container">

          <div className="landing-input">
          <h1 className="landing-header">TraderSquare</h1>
          <h1 className="">picking stocks has never been easier</h1>

            <div className="col-md-3"></div>
            <div className="col-md-6">
              <br/>
              <br/>
            </div>
            <div className="col-md-3"></div>

          </div>

      </div>

      <div className="row">

        <div className="col-md-4">
          <h2 className="centerheading">SEARCH STOCKS</h2>
          
          <div className="row col-md-12">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <SearchBar/>
            </div>
            <div className="col-md-1"></div>
          </div>

          <div className="col-md-12"><p className="col-md-12 centertext">Enter any stock ticker to see it's most common metrics and breif descriptions for each metric.</p></div>


        </div>

        <div className="col-md-4">
          <h2 className="centerheading"><Link to="/strategyview">EXPLORE BY METRIC</Link></h2>

          <div className="col-md-12"><p className="col-md-12 centertext">Explore common investment metrics and see the best performing stocks in the S&P 500 based on these metrics.</p></div>

{/*          <div className="row col-md-12">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <button className="btn btn-secondary"><StratNav/></button>
            </div>
            <div className="col-md-4"></div>
          </div>*/}

        </div>

        <div className="col-md-4">
          <h2 className="centerheading"><Link to="/filterview">PICK STOCKS</Link></h2>
          <div className="col-md-12"><p className="col-md-12 centertext">Already know what you are looking for? Pick stocks from the S&P 500 with your own set of criteria.</p></div>

          {/*<div className="row col-md-12">
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <button className="btn btn-secondary"><FilterNav/></button>
                      </div>
                      <div className="col-md-4"></div>
                    </div>*/}

        </div>

      </div>
      </div>

    );
  }
}
