import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/get_strat_data';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import {searchStockData as SearchStockData} from '../actions/stock_search';
import {getGraphData as GetGraphData} from '../actions/get_graph_data';


// import { DropdownButton } from 'react-bootstrap';
// import Bootstrap from 'react-bootstrap';
// import Select from 'react-bootstrap-select';

// const React.Bootstrap = Bootstrap;
// const React.Bootstrap.Select = Select;

class StrategyView extends Component {
  constructor(props) {
    super(props);

    this.state = {selectValue: 'altmanzscore', items: 10, flag: false}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewMore = this.viewMore.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    this.props.getStratData();
    this.setState({flag: true})
  }

  handleChange(event) {
    this.setState({selectValue: event.target.value, items: 10})
  }

  handleSubmit(ticker) {
    this.props.SearchStockData(ticker);
    this.props.GetGraphData(ticker);
  }

  viewMore(){
    this.setState({items: this.state.items + 10})
  }

  render(){
    if(!this.props.strategyData){
      return (
        <div>
        <h3>loading...</h3>
        </div>
        )
    }
    else{
    let currentStrat = this.state.selectValue + "2015";
    let filteredStocks = [];

    for(let n of this.props.strategyData){
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
            <Link to="/stockview" onClick={()=>{this.handleSubmit(stock.ticker)}}><td>{stock.ticker}</td></Link>
            <td>{stock.name}</td>
            <td>{stock.close_price}</td>
            <td>{val}</td>
            <td>{100-(Math.round((stockKey/filteredStocks.length)*100))}%</td>
        </tr>
      </tbody>)
    })

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
          <div className="col-md-3">
          <select
            value={this.state.selectValue}
            onChange={this.handleChange}
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
    strategyData: state.stratData
  }
}

export default connect(mapStateToProps, {SearchStockData, getStratData, GetGraphData})(StrategyView)
