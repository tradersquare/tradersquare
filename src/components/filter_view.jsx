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
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.generateNewFilter = this.generateNewFilter.bind(this);

  }

  componentWillMount() {
    this.generateNewFilter();
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

  generateNewFilter() {
    let template =  {
          strat: 'altmanzscore',
          sign: '<',
          input: 0,
          type: "Value",
          index: this.state.counter
      }
    let copy = this.state.allFilters.slice();
    copy.push(template);
    this.setState({
      allFilters: copy,
      counter: this.state.counter + 1
    });
  }


  onFormSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    this.props.getDBDataFiltered(this.state.allFilters);
  }

  onSelectChange(event) {
    let allFiltersNew = this.state.allFilters.slice();
    allFiltersNew[0].strat = event.target.value;
    this.setState({allFilters: allFiltersNew});
  }

  handleSignClick(event) {
    let allFiltersNew = this.state.allFilters.slice();
    if (allFiltersNew[0].sign === ">") {
      allFiltersNew[0].sign = "<";
    } else {
      allFiltersNew[0].sign = ">";
    }
    this.setState({allFilters: allFiltersNew});
  }

  handleTypeClick(event) {
    let allFiltersNew = this.state.allFilters.slice();
    if (allFiltersNew[0].type === "Value") {
      allFiltersNew[0].type = "Percentile";
    } else {
      allFiltersNew[0].type = "Value";
    }
    this.setState({allFilters: allFiltersNew});
    }

  onInputChange(event,key) {
    console.log(event.target.value, key)
    console.log(this.state.allFilters)
    let allFiltersNew = this.state.allFilters.slice();
    allFiltersNew[key].input = event.target.value;
    this.setState({allFilters: allFiltersNew});
  }

  render() {

    let filterInputs = this.state.allFilters.map((obj) => {
      let key = obj.index;
      return (
        <div key={key}>
            <select
            value={this.state.allFilters[key].strat}
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
          <button type = "button" className="btn btn-secondary" onClick={this.handleSignClick}> {this.state.allFilters[key].sign} </button>
          <input type="text"
                 value={this.state.allFilters[key].input}
                 onChange={this.onInputChange.bind(this, event, key)} />
          <button type = "button" className="btn btn-secondary" onClick={this.handleTypeClick}> {this.state.allFilters[key].type} </button>
        </div>
      )
    })


    return (
      <div >
      <Header />
      <div className="row">
        <div className="col-md-6 filter">
        <h2> Filters </h2>
        <form onSubmit={this.onFormSubmit}>
          {filterInputs}
          <br/><br/>
            <button type="submit" className="btn btn-secondary">Submit
            </button>
        </form>
          <button className="btn btn-secondary" onClick={this.generateNewFilter}>+
            </button>
        </div>
        <div className="col-md-6 results">
        <h2> Results </h2>
        <table className="tablr">
          <tbody><tr>
          <th>Ticker</th>
          <th>Price</th>
          <th> </th>
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
