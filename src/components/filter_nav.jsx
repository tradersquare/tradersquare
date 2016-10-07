import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {bindActionCreators} from 'redux';
import getFilterData from '../actions/get_db_data_filtered';

class FilterNav extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Link to="/filterview" className="btn btn-secondary">
               Pick Stocks
        </Link>
      </div>
    )
  }
}

export default connect(null, {getFilterData})(FilterNav);
