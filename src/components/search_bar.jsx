import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData} from '../actions/index';
import {bindActionCreators} from 'redux';


class SearchBar extends Component {
  // componentWillMount() {
  //   this.props.searchStockData();
  // }

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({searchStockData}, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);
