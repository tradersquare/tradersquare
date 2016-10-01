import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import getDBDataFiltered from '../actions/get_db_data_filtered';
import Header from './header';

class FilterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFilters: [
        {
          strat: 'altmanzscore',
          sign: '<',
          input: 30,
          type: "value"
        }
      ],
      counter: 0,
      results: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidUpdate() {
    if (this.state.results.length !== this.props.filterData.length){
      let counter = 0;
      let mapFilterData = this.props.filterData.map((stock) => {
        counter++;
        return (
        <tbody key={counter}>
          <tr>
            <td>{stock.ticker}</td>
            <td>{stock.close_price}</td>
            <td>{stock[this.state.allFilters[0].strat]}</td>
          </tr>
        </tbody>
        )
      })
      this.setState({results: mapFilterData})
    }
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.getDBDataFiltered(this.state.allFilters);
  }

  onSelectChange(event) {
    let allFiltersNew = this.state.allFilters.slice();
    allFiltersNew[0].strat = event.target.value;
    this.setState({allFilters: allFiltersNew})
  }

  render() {

    return (
      <div >
      <Header />
      <div className="row">
        <div className="col-md-6 filter">
        <h2> Filters </h2>
        <form onSubmit={this.onFormSubmit}>
          <select
            value={this.state.allFilters[0].strat}
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
          <br/><br/>
            <button type="submit">Submit</button>
        </form>
        </div>
        <div className="col-md-6 results">
        <h2> Results </h2>
        <table className="tablr">
          <tbody><tr>
          <th>Ticker</th>
          <th>Price</th>
          <th> ??? </th>
          </tr></tbody>
          {this.state.results}
          </table>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps({filterData}) {
  return {filterData};
}

export default connect(mapStateToProps, {getDBDataFiltered})(FilterView)
