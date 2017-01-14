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
        <div className="landing-background">
          <div className="intrinio-logo"><img src="/images/intrinio.png"/></div>
          <div className="landing-top">
              <div className="landing-title">
                <h1 className="landing-header">TRADERSQUARE</h1>
                <h1 className="landing-tagline">picking stocks has never been easier</h1>
                  <div className="row landing-search">
                    <div className="col-md-3"></div>
                    <div className="col-md-6"><SearchBar/></div>
                    <div className="col-md-3"></div>
                  </div>
              </div>
          </div>
        </div> 


        <div className="row landing-bottom">

          <div className="col-md-4 no-padding">
            <h2 className="centerheading"><Link to="/strategyview">VIEW BY METRIC</Link></h2>
            <div className="col-md-12"><p className="col-md-12 centertext">Explore common investment metrics and view the best performing stocks in the S&P 500.</p></div>
          </div>

          <div className="col-md-4 no-padding">
            <h2 className="centerheading"><Link to="/filterview">PICK STOCKS</Link></h2>
            <div className="col-md-12"><p className="col-md-12 centertext">Know what you are looking for? Find stocks from the S&P 500 that fulfill specified criterias.</p></div>
          </div>

          <div className="col-md-4 no-padding">
            <h2 className="centerheading"><Link to="/filterview">ABOUT US</Link></h2>
            <div className="col-md-12"><p className="col-md-12 centertext">Learn more about us and what technologies were used to create TraderSquare.</p></div>
          </div>

        </div>
      </div>

    );
  }
}
