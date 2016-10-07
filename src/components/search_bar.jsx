import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/get_strat_data';
import {getGraphData as GetGraphData} from '../actions/get_graph_data';
import getPercentile from '../actions/get_percentile';
import sendTicker from '../actions/stock_view_validation';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ticker: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTicker = this.setTicker.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleSubmit() {
    this.props.SearchStockData(this.state.ticker);
    this.props.GetGraphData(this.state.ticker);
    this.props.getPercentile(this.state.ticker);
    this.props.sendTicker(this.state.ticker);
    browserHistory.push('/stockview')
  }

  handleEnter(e) {
    if(e.key === 'Enter'){
      this.handleSubmit()
    }
  }

  setTicker(ev) {
    this.setState({ticker: ev.target.value});
  }
  render() {
    return (
      <div className="input-group" onKeyPress={this.handleEnter}>
        <input className="form-control" value={this.state.ticker} onChange={this.setTicker} placeholder="Enter a Ticker here"></input>
        <span className="input-group-btn">
          <Link to="/stockview" onClick={this.handleSubmit} className="btn btn-secondary" >
                Search
          </Link>
        </span>
      </div>
    )
  }
}

export default connect(null, {SearchStockData, getStratData, GetGraphData, getPercentile, sendTicker})(SearchBar);
