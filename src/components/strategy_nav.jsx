import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/get_strat_data';

class StratNav extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log('handleClick')
    this.props.getStratData();
  }

  render() {
    return (
      <div className="">
        <Link to="/strategyview" onClick={this.handleClick} className="btn btn-secondary">
               View Stocks By Indicator
        </Link>
      </div>
    )
  }
}

export default connect(null, {getStratData})(StratNav);
