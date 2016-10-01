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
      results: [],
      values: {
        altmanzscore: 'Z-Score',
        assetturnover: 'Asset Turnover',
        grossmargin: 'Gross Margin',
        pricetoearnings: 'P/E',
        currentratio: 'Current Ratio',
        epsgrowth: 'EPS Growth',
        divpayoutratio: 'Dividend Payout Ratio',
        debttoequity: 'Debt To Equity',
        enterprisevalue: 'Enterprise Value',
        earningsyield: 'Earnings Yield',
        netincomegrowth: 'Net Income Growth',
        roe: 'Return on Equity',
      }
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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
    this.setState({allFilters: allFiltersNew});
  }

  handleSignClick(event) {
    let allFiltersNew = this.state.allFilters.slice();
    console.log("this.state.allfilters: ", this.state.allFilters);
    if (allFiltersNew[0].sign === ">") {
      allFiltersNew[0].sign = "<";
    } else {
      allFiltersNew[0].sign = ">";
    }
    this.setState({allFilters: allFiltersNew});
  }

  onInputChange(event) {
    let allFiltersNew = this.state.allFilters.slice();
    allFiltersNew[0].input = event.target.value;
    this.setState({allFilters: allFiltersNew});
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
          <button type = "button" className="btn btn-secondary" onClick={this.handleSignClick}> {this.state.allFilters[0].sign} </button>
          <input type="text"
                 value={this.state.allFilters[0].input}
                 onChange={this.onInputChange} />
          <br/><br/>
            <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
        </div>
        <div className="col-md-6 results">
        <h2> Results </h2>
        <table className="tablr">
          <tbody><tr>
          <th>Ticker</th>
          <th>Price</th>
          <th> {this.state.values[this.state.allFilters[0].strat]}</th>
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
