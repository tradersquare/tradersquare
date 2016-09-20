import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData} from '../actions/index';

class SearchBar extends Component {
  render() {

    return (
      <div>
        <input placeholder="Enter a Ticker here"></input>
        <Link to="/stockview" onClick={this.props.searchStockData} className="btn btn-primary">
              Results
        </Link>
      </div>
    )
  }
}

export default connect(null, {searchStockData})(SearchBar);
