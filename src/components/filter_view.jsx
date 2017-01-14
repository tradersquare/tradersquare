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
import Modal from 'react-modal';
import sendTicker from '../actions/stock_view_validation';


class FilterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFilters: [
          ],
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
        quickratio: 'Quick Ratio',
        dividendyield: 'Dividend Yield',
        leverageratio: 'Leverage Ratio',
        roa: 'Return on Asset',
        roic: 'Return on Invested Capital',
        pricetobook: 'Price to Book',
        beta: 'Beta'
      },
      columns: [],
      modalOpen: false,
      currentStocks: 0
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.generateNewFilter = this.generateNewFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.deleteExistingFilter = this.deleteExistingFilter.bind(this);
  }

  componentWillMount() {
    this.generateNewFilter();
  }

  componentDidUpdate() {
    // if(!this.props.filterData[0]){
    //   return;
    // }
    // if ( (this.state.currentStocks.length !== this.props.filterData.length || this.state.currentStocks[0] !== this.props.filterData[0].ticker)){
    if ( this.state.currentStocks !== this.props.filterData.length){
      console.log("component updating", this.props.filterData.length, this.state.currentStocks.length)
      let filterResults = [];
      let allKeys = [];
      for (let key in this.props.filterData[0]) {
        if (key !== "percentile" && key !== "ticker" && key !== "close_price") {
          allKeys.push(key);
        }
      }

      let stockKey = 0;

      for(let i = 0; i < this.props.filterData.length; i+=3){
        const stocks = [];
        for(let j =0; j < 3; j++){
          console.log("rendering")
          let stock = this.props.filterData[i+j];
          if(!stock){
            break;
          }
          let metrics = allKeys.map((metric) => {
          return (
            <div key = {metric} className="row">
            <span className="col-md-6 smallwords">{this.state.values[metric]}</span>
            <span className="col-md-6 textright smallwords">{stock[metric]}</span>
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
          {stocks[2]}

        </div>)
      }
      this.setState({results: filterResults, currentStocks: this.props.filterData.length})
      console.log("after rendering...")
      console.log(this.state.results.length)
      console.log(this.state.currentStocks)
      console.log(this.props.filterData.length)
    }
  }

  generateNewFilter() {
    const index = this.state.allFilters.length;
    let template =  {
          strat: 'altmanzscore',
          sign: '<',
          input: 0,
          type: "Value",
          index: index,
          message: ""
      }
    let copy = this.state.allFilters.slice();
    copy.push(template);
    this.setState({
      allFilters: copy
    });
  }

  deleteExistingFilter(event, key) {
    if (this.state.allFilters.length !== 1) {
      let copy = this.state.allFilters.slice();
      copy.splice(key, 1);
      let newAllFilters = [];
      for (let i = 0; i < copy.length; i++) {
        copy[i].index = i;
        newAllFilters.push(copy[i]);
      }

      this.setState({allFilters: newAllFilters});

      console.log(newAllFilters)
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    let flag = true;
    for(let i = 0; i < this.state.allFilters.length; i++){
      if(this.state.allFilters[i].message){
        flag = false;
        this.openModal();
      }
    }
    if(flag){
      this.props.getDBDataFiltered(this.state.allFilters);
    }
  }

  openModal() {
    this.setState({modalOpen: !this.state.modalOpen})
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
    let input = this.refs["input"+key].value;
    let allFiltersNew = this.state.allFilters.slice();
    if((isNaN(parseFloat(input)) && input !== "") || (parseFloat(input).toString()) !== input){
      allFiltersNew[key].message = (<div className="alert alert-danger" role="alert">
        <strong>Oops!</strong> Please enter a valid number
        </div>)
      allFiltersNew[key].input = input
    }
    else{
      allFiltersNew[key].input = input;
      allFiltersNew[key].message = "";
    }

    this.setState({allFilters: allFiltersNew});
  }

  handleSubmit(ticker) {
    this.props.SearchStockData(ticker);
    this.props.GetGraphData(ticker);
    this.props.getPercentile(ticker);
    this.props.sendTicker(ticker);

  }

  render() {

    const modalStyle = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '50%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    let resultsHeader = this.state.results.length > 0 ? "Results" : "";

    let filterInputs = this.state.allFilters.map((obj) => {
      console.log("FILTERS IN RENDER: ", this.state.allFilters)
      let key = obj.index;
      return (<div key={key} className="col-md-12">
        <div  className="row filter-bar col-md-12">
            <select
            ref={"strat"+key}
            value={this.state.allFilters[key].strat}
            onChange={this.onSelectChange.bind(this,event,key)}
            className="col-md-3 filter-drop"
          >
            <option value="">--select metric to begin--</option>
              <option value="altmanzscore">Z-Score</option>
              <option value="assetturnover">Asset Turnover</option>
              <option value="grossmargin">Gross Margin</option>
              <option value="pricetoearnings">P/E</option>
              <option value="currentratio">Current Ratio</option>
              <option value="quickratio">Quick Ratio</option>
              <option value="epsgrowth">EPS Growth</option>
              <option value="divpayoutratio">Dividend Payout Ratio</option>
              <option value="dividendyield"> Dividend Yield</option>
              <option value="debttoequity">Debt To Equity</option>
              <option value="leverageratio">Leverage Ratio</option>
              <option value="enterprisevalue">Enterprise Value</option>
              <option value="earningsyield">Earnings Yield</option>
              <option value="netincomegrowth">Net Income Growth</option>
              <option value="roe">Return on Equity</option>
              <option value="roa">Return on Asset</option>
              <option value="roic">Return on Invested Capital</option>
              <option value="pricetobook">Price to Book</option>
              <option value="beta">Beta</option>
          </select>
          <button type="button"
                  className="btn btn-secondary filter-button col-md-2"
                  onClick={this.handleSignClick.bind(this, event, key)}> {this.state.allFilters[key].sign} </button>
          <input type="text"
                 ref={"input"+key}
                 value={this.state.allFilters[key].input}
                 onChange={this.onInputChange.bind(this, event, key)}
                 className="filter-button col-md-2"/>
          <button type="button"
                  className="btn btn-secondary filter-button col-md-3"
                  onClick={this.handleTypeClick.bind(this, event, key)}> {this.state.allFilters[key].type} </button>
          <button type="button"
                  className="btn btn-secondary filter-button col-md-2"
                  onClick={this.deleteExistingFilter.bind(this, event, key)}> Remove</button>
        </div>
        <div></div>
          <div><span>{this.state.allFilters[key].message}</span></div>
        </div>
      )
    })

    let columnHeaders = this.state.columns.map((val) => {
      return (
        <th key={val}> {this.state.values[val]} </th>
        )
    })

    return (
      <div className="">
      <Header />
      <div className="row">
        <div className="col-md-12 filter">
         <div className="row col-md-12">
           <div className="col-md-12">
              <h1> Filters </h1>
           </div>
           <br/><br/>
         </div>
        <form onSubmit={this.onFormSubmit}>
          {filterInputs}
           <div className="row col-md-4">
             <br/>
            <button type="submit" className="btn btn-secondary col-md-4 centertext">Submit  </button>
           </div>
        </form>

         <button className="btn btn-secondary col-md-4 col-md-offset-2 pushdown-sm" onClick={this.generateNewFilter}>Add More Filters
         </button>

        </div>
        <div className="col-md-12 results">
          <div className="col-md-12 pushdown-sm">
            <h1>{resultsHeader}</h1>
          </div>
        {this.state.results}
        </div>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={modalStyle}
        >
        <h2 className="centerheading">What part of "please type in a valid number" do you not understand?</h2>

        </Modal>


      </div>
      </div>
    )
  }
}

function mapStateToProps({filterData}) {
  return {filterData};
}

export default connect(mapStateToProps, {getDBDataFiltered, SearchStockData, GetGraphData, getPercentile, sendTicker})(FilterView)
