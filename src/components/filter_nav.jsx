import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {bindActionCreators} from 'redux';
import getFilterData from '../actions/get_db_data_filtered';

class FilterNav extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log('handleClick')
    this.props.getFilterData();
  }

  render() {
    return (
      <div className="">
        <Link to="/filterview" onClick={this.handleClick} className="btn btn-secondary">
               Pick Stocks
        </Link>
      </div>
    )
  }
}

export default connect(null, {getFilterData})(FilterNav);
