import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/get_strat_data';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {getGraphData as GetGraphData} from '../actions/get_graph_data';
import Loading from './loading';
import Header from './header';
import getPercentile from '../actions/get_percentile';


// import { DropdownButton } from 'react-bootstrap';
// import Bootstrap from 'react-bootstrap';
// import Select from 'react-bootstrap-select';

// const React.Bootstrap = Bootstrap;
// const React.Bootstrap.Select = Select;

class StrategyView extends Component {
  constructor(props) {
    super(props);

    // let initialVal = '';
    // if(this.props.strategyData && this.props.strategyData.metric){
    //   initialVal = this.props.strategyData.metric;
    // }"
    this.state = {selectValue: "", items: 10, flag: false}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewMore = this.viewMore.bind(this);
    this.setMetric = this.setMetric.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    // this.props.getStratData();
    // this.setState({flag: true})
    // if(this.props.strategyData && this.props.strategyData.metric && this.props.strategyData.metric !== this.state.selectValue){
    //   this.setState({selectValue: this.props.stratMetric})
    // }
    
    
  }
  
  componentDidUpdate(){
    if(this.props.stratMetric && this.props.stratMetric !== this.state.selectValue && !this.state.flag){
      this.setState({selectValue: this.props.stratMetric})
      this.setState({flag: true})
    }
  }

  setMetric(){
    this.setState({selectValue: this.props.stratMetric})
  }

  handleChange(event) {
    if(!this.props.strategyData){
      this.props.getStrateData(this.state.selectValue)
    }
    this.setState({selectValue: event.target.value, items: 10})
  }

  handleSubmit(ticker) {
    this.props.SearchStockData(ticker);
    this.props.GetGraphData(ticker);
    this.props.getPercentile(ticker);

  }

  viewMore(){
    this.setState({items: this.state.items + 10})
  }

  render(){
    if(!this.props.strategyData){
      return (
        <Loading />
        )
    }
    else{
    let currentStrat = this.state.selectValue;
    let filteredStocks = [];

    for(let n of this.props.strategyData.data){
      if(!isNaN(parseFloat(n[currentStrat]))){
        n[currentStrat] = parseFloat(n[currentStrat]);
        filteredStocks.push(n);
      }
    }

    let stratData = filteredStocks.sort((a,b) => {
      let newA = a[currentStrat];
      let newB = b[currentStrat];
      if(newA > newB) return -1;
      if(newA < newB) return 1;
    })

    let stockKey = 0;

    let that = this;

    stratData = filteredStocks.map((stock) => {
      if(stockKey >= that.state.items){
        return;
      }
      stockKey++;
      let val = stock[currentStrat];
      return (
      <tbody key={stockKey}>
        <tr>
            <td><Link to="/stockview" onClick={()=>{this.handleSubmit(stock.ticker)}}>{stock.ticker}</Link></td>
            <td>{stock.name}</td>
            <td>{stock.close_price}</td>
            <td>{val}</td>
            <td>{100-(Math.round((stockKey/filteredStocks.length)*100))}%</td>
        </tr>
      </tbody>)
    })

    return (
        <div >
          <Header />
          <div className="col-md-3">
          {this.setMetric}
          <select
            value={this.state.selectValue}
            onChange={this.handleChange}
            >
            <option value=""></option>
            <option value="altmanzscore">Z-Score</option>
            <option value="assetturnover">Asset Turnover</option>
            <option value="grossmargin">Gross Margin</option>
            <option value="pricetoearnings">P/E</option>
            <option value="currentratio">Current Ratio</option>
            <option value="quickratio">Quick Ratio</option>
            <option value="epsgrowth">EPS Growth</option>
            <option value="divpayoutratio">Dividend Payout Ratio</option>
            <option value="debttoequity">Debt To Equity</option>
            <option value="leverageratio">Leverage Ratio</option>
            <option value="enterprisevalue">Enterprise Value</option>
            <option value="earningsyield">Earnings Yield</option>
            <option value="netincomegrowth">Net Income Growth</option>
            <option value="roe">Return on Equity</option>
            <option value="beta">Beta</option>
          </select>
          </div>
            <table className="tablr">
            <tbody><tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Price</th>
              <th>Value</th>
              <th>Percentile</th>
            </tr></tbody>
            {stratData}
            </table>
          <a onClick={this.viewMore}>...more</a>
        </div>

      )
    }
  }

}

function mapStateToProps(state) {
  return {
    strategyData: state.stratData,
    stratMetric: state.stratMetric  
  }
}

export default connect(mapStateToProps, {SearchStockData, getStratData, GetGraphData, getPercentile})(StrategyView)
