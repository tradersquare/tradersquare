import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/watchlist_Add';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ticker: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTicker = this.setTicker.bind(this);
  }

  handleSubmit() {
    this.props.SearchStockData(this.state.ticker);
    this.setState({ticker: ''});
  }

  setTicker(ev) {
    this.setState({ticker: ev.target.value});
  }

  handleClick(){
    console.log('handleClick')
    this.props.getStratData();
  }

  render() {
    return (
      <div>
        <input value={this.state.ticker} onChange={this.setTicker} placeholder="Enter a Ticker here"></input>
        <Link to="/stockview" onClick={this.handleSubmit} className="btn btn-primary">
              Results
        </Link>
        <Link to="/strategyview" onClick={this.handleClick} className="btn btn-primary">
              Watch List
        </Link>
      </div>
    )
  }
}

export default connect(null, {SearchStockData, getStratData})(SearchBar);
