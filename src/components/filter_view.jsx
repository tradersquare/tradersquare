import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import getDBDataFiltered from '../actions/get_db_data_filtered';

class FilterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strat: 'altmanzscore',
      counter: 0
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleFinalSubmit = this.handleFinalSubmit.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    // this.renderFilterList = this.renderFilterList.bind(this);
    // this.filterDataCheck = this.filterDataCheck.bind(this);
  }
  onFormSubmit(event) {
    event.preventDefault();
    console.log('insideo onFormSubmit', this.state.strat);
    this.props.getDBDataFiltered(this.state.strat)
  }

  onSelectChange() {
    this.setState({strat: event.target.value})
  }

  render() {

    return (
      <div >
      <div className="row header">
        <h1 className="heading col-md-7"><Link to="/">TraderSquare</Link></h1>
        <div className="col-md-3 top-padding">
          <SearchBar/>
        </div>
        <div className="col-md-2 top-padding">
          <StratNav/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 filter">
        <h2> Filters </h2>
        <form onSubmit={this.onFormSubmit}>
          <select
            value={this.state.strat}
            onChange={this.onSelectChange}
          >
            <option value="altmanzscore">Z-Score</option>
            <option value="assetturnover">Asset Turnover</option>
            <option value="grossmargin">Gross Margin</option>
            <option value="pricetoearnings">P/E</option>
            <option value="currentratio">Current Ratio</option>
            <option value="epsgrowth">EPS Growth</option>
            <option value="divpayoutratio">Dividend Payout Ratio</option>
            <option value="debttoequity">Debt To Equity</option>
            <option value="enterprisevalue">Enterprise Value</option>
            <option value="earningsyield">Earnings Yield</option>
            <option value="netincomegrowth">Net Income Growth</option>
            <option value="roe">Return on Equity</option>
          </select>
            <button type="submit">Submit</button>
        </form>
        </div>

        <div className="col-md-6 results">
        <h2> Results </h2>
        <table className="tablr">
          <tbody><tr>
          <th>Ticker</th>
          <th>Price</th>
          </tr></tbody>
          </table>
        </div>

      </div>
      </div>
    )

  }

}
function mapStateToProps(state) {
  return {
    filterData: state.filterData
  }
}

export default connect(mapStateToProps, {getDBDataFiltered})(FilterView)
