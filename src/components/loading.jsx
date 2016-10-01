import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/get_strat_data';

class Loading extends Component {

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 pushdown">
            <h1 className="col-md-12 centerheading">LOADING...</h1>
            <img className="col-md-12" src="http://www.dancingmoney.org/wp-content/uploads/2011/12/moneydancegif.gif" />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    )
  }
}

export default connect(null, {})(Loading);
