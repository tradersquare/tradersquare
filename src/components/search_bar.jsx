import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {bindActionCreators} from 'redux';


class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ticker: 'TSLA'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTicker = this.setTicker.bind(this);
  }

  handleSubmit() {
    this.props.SearchStockData(this.state.ticker);
    this.setState({ticker: ''});
  }

  setTicker(ev) {
    this.setState({ticker: ev.target.value});
  }

  render() {
    return (
      <div>
        <input value={this.state.ticker} onChange={this.setTicker} placeholder="Enter a Ticker here"></input>
        <Link to="/stockview" onClick={this.handleSubmit} className="btn btn-primary">
              Results
        </Link>
      </div>
    )
  }
}

export default connect(null, {SearchStockData})(SearchBar);
