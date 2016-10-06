import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import getDBDataFiltered from '../actions/get_db_data_filtered';
import Header from './header';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {getGraphData as GetGraphData} from '../actions/get_graph_data';
import getPercentile from '../actions/get_percentile';


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
      },
      columns: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.generateNewFilter = this.generateNewFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.generateNewFilter();
  }
 
  componentDidUpdate() {
    console.log(this.state.results.length, this.props.filterData.length)
    if (this.state.results.length !== (this.props.filterData.length / 2)){
      console.log("updating")
      let counter = 0;
      let mapFilterData = this.props.filterData.map((stock) => {
        counter++;
        let allKeys = []
        for (let key in stock) {
          if (key !== "percentile" && key !== "ticker" && key !== "close_price") {
            allKeys.push(key);
          }
        }
        // let columns = allKeys.map((key) => {
        //   return (
        //     <td key = {key}> {stock[key]} </td>
        //     )
        // })
        // this.setState({columns: allKeys});
        // return (
        // <tbody key={counter}>
        //   <tr>
        //     <td>{stock.ticker}</td>
        //     <td>{stock.close_price}</td>
        //     {columns}
        //   </tr>
        // </tbody>
        // )
        let metrics = allKeys.map((metric) => {
          return (
            <span key = {metric}>{metric}: {stock[metric]} </span>
            )
        })
        return (<div  key = {counter} className="card">
          <span>{stock.ticker}</span>
          <span>{stock["close_price"]}</span>
          {metrics}
          </div>
          )
      })

      let filterResults = [];
      let allKeys = [];
      for (let key in this.props.filterData[0]) {
        if (key !== "percentile" && key !== "ticker" && key !== "close_price") {
          allKeys.push(key);
        }
      }

      let stockKey = 0;

      for(let i = 0; i < this.props.filterData.length; i+=2){
        const stocks = [];
        for(let j =0; j < 2; j++){
          let stock = this.props.filterData[i+j];
          let metrics = allKeys.map((metric) => {
          return (
            <div key = {metric} className="row">
            <span className="col-md-6">{this.state.values[metric]}</span>
            <span className="col-md-6 textright">{stock[metric]}</span>
            </div>
            )
          })
          stocks.push(<div className="card clickable-card" key={stockKey}><Link to="/stockview" onClick={()=>{this.handleSubmit(stock.ticker)}}>
              <strong className="col-md-6">{stock.ticker}:</strong>
              <span className="col-md-6 textright">${stock.close_price}</span>
              <span className="col-md-12 smallwords centertext">{stock.name}</span>
              {metrics}
            </Link></div>)
          stockKey++;
        }
        filterResults.push(<div className="card-deck" key={stockKey * 27}>
          {stocks[0]}
          {stocks[1]}

        </div>)
      }
      this.setState({results: filterResults})
    }
  }

  generateNewFilter() {
    const index = this.state.counter;
    let template =  {
          strat: 'altmanzscore',
          sign: '<',
          input: 0,
          type: "Value",
          index: index
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
    this.props.getDBDataFiltered(this.state.allFilters);
  }

  onSelectChange(event,key) {
    let allFiltersNew = this.state.allFilters.slice();
    let input = this.refs["strat"+key].value;
    allFiltersNew[key].strat = input;
    this.setState({allFilters: allFiltersNew});
  }

  handleSignClick(event,key) {
    let allFiltersNew = this.state.allFilters.slice();
    if (allFiltersNew[key].sign === ">") {
      allFiltersNew[key].sign = "<";
    } else {
      allFiltersNew[key].sign = ">";
    }
    this.setState({allFilters: allFiltersNew});
  }

  handleTypeClick(event,key) {
    let allFiltersNew = this.state.allFilters.slice();
    if (allFiltersNew[key].type === "Value") {
      allFiltersNew[key].type = "Percentile";
    } else {
      allFiltersNew[key].type = "Value";
    }
    this.setState({allFilters: allFiltersNew});
    }

  onInputChange(event,key) {
    console.log(this.state.allFilters);
    let input = this.refs["input"+key].value;

    let allFiltersNew = this.state.allFilters.slice();
    allFiltersNew[key].input = input;
    this.setState({allFilters: allFiltersNew});
  }

  handleSubmit(ticker) {
    this.props.SearchStockData(ticker);
    this.props.GetGraphData(ticker);
    this.props.getPercentile(ticker);

  }

  render() {
    let filterInputs = this.state.allFilters.map((obj) => {
      let key = obj.index;
      return (
        <div key={key}>
            <select
            ref={"strat"+key}
            value={this.state.allFilters[key].strat}
            onChange={this.onSelectChange.bind(this,event,key)}
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
          <button type="button"
                  className="btn btn-secondary"
                  onClick={this.handleSignClick.bind(this, event, key)}> {this.state.allFilters[key].sign} </button>
          <input type="text"
                 ref={"input"+key}
                 value={this.state.allFilters[key].input}
                 onChange={this.onInputChange.bind(this, event, key)} />
          <button type="button"
                  className="btn btn-secondary"
                  onClick={this.handleTypeClick.bind(this,event,key)}> {this.state.allFilters[key].type} </button>
        </div>
      )
    })

    let columnHeaders = this.state.columns.map((val) => {
      return (
        <th key={val}> {this.state.values[val]} </th>
        )
    })

    return (
      <div >
      <Header />
      <div className="row">
        <div className="col-md-6 filter">
         <div className="row">
           <div className="col-md-10">
              <h2> Filters </h2>
           </div>
           <div className="col-md-2">
             <button className="btn btn-secondary" onClick={this.generateNewFilter}>+
             </button>
           </div>
         </div>
        <form onSubmit={this.onFormSubmit}>
          {filterInputs}
          <br/>
            <button type="submit" className="btn btn-secondary">Submit
            </button>
        </form>
        </div>
        <div className="col-md-6 results">
        <h2> Results </h2>
        {this.state.results}
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps({filterData}) {
  return {filterData};
}

export default connect(mapStateToProps, {getDBDataFiltered, SearchStockData, GetGraphData, getPercentile})(FilterView)


// <table className="tablr">
//           <tbody><tr>
//           <th>Ticker</th>
//           <th>Price</th>
//           {columnHeaders}
//           </tr></tbody>
//           {this.state.results}
//           </table>