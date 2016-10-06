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
    this.state = {selectValue: "", items: 21, flag: false, tableFlag: false}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewMore = this.viewMore.bind(this);
    this.setMetric = this.setMetric.bind(this);
    this.renderTable = this.renderTable.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    // console.log("componentWillMount")
    this.props.getStratData();
    if(this.props.strategyData && this.props.strategyData.metric && this.props.strategyData.metric !== this.state.selectValue){
      this.setState({selectValue: this.props.stratMetric})
      // this.setState({flag: true})
    }

  }

  // ComponentWillReceiveProps(){
  //   console.log("ComponentWillReceiveProps");
  //   if(this.props.stratMetric && this.props.stratMetric !== this.state.selectValue && !this.state.flag){
  //     this.setState({selectValue: this.props.stratMetric})
  //     this.renderTable();
  //     this.setState({flag: true})
  //   }
  // }

  componentDidMount(){
    // console.log("componentDidMount")
    // this.renderTable();
  }

  componentDidUpdate(){
    console.log("componentDidUpdate", this.props.stratMetric)
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
    this.setState({selectValue: event.target.value, items: 21})
    // const table = this.renderTable();
    // this.setState({table: table})
  }

  handleSubmit(ticker) {
    this.props.SearchStockData(ticker);
    this.props.GetGraphData(ticker);
    this.props.getPercentile(ticker);

  }

  renderTable(){
    console.log("in render table", this.state.selectValue)
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

    if(this.state.selectValue){
      console.log("table if")
      return (<div><table className="tablr">
          <tbody><tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Price</th>
            <th>Value</th>
            <th>Percentile</th>
          </tr></tbody>
          {stratData}
          </table>
        <a onClick={that.viewMore}>...more</a></div>)
    }
    else{
      console.log("table else")
      return(
        <p>bleh</p>
        )
    }
  }

  viewMore(){
    this.setState({items: this.state.items + 9})
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

    // let stockKey = 0;

    let that = this;

    // stratData = filteredStocks.map((stock) => {
    //   if(stockKey >= that.state.items){
    //     return;
    //   }
    //   stockKey++;
    //   let val = stock[currentStrat];
    //   return (
    //   <tbody key={stockKey}>
    //     <tr>
    //         <td><Link to="/stockview" onClick={()=>{this.handleSubmit(stock.ticker)}}>{stock.ticker}</Link></td>
    //         <td>{stock.name}</td>
    //         <td>{stock.close_price}</td>
    //         <td>{val}</td>
    //         <td>{100-(Math.round((stockKey/filteredStocks.length)*100))}%</td>
    //     </tr>
    //   </tbody>)
    // })

    // const headingNames = ["Ticker", "Name", "Price", "Value", "Percentile"]
    // let h = 0
    // let headings, seeMore;
    // if(this.state.selectValue){
    //   headings = headingNames.map((heading)=>{
    //     h++;
    //     return <th key={h}>{heading}</th>
    //   })
    //   const addButton = () => {
    //     return (<button className="btn btn-secondary" onClick={that.viewMore}>load more</button>)
    //   }
    //   seeMore = addButton();

    // }

   let stockKey = 0

    let cards = [];
    if(this.state.selectValue){
      console.log(that.state.items)
      for(let i = 0; i < that.state.items; i+=3){
        const stocks = [];
        for(let j = 0; j < 3; j++){
          let stock = filteredStocks[i+j];
          console.log("came in here", i+j, stock.ticker)
          stocks.push(<div className="card clickable-card" key={stockKey}><Link to="/stockview" onClick={()=>{this.handleSubmit(stock.ticker)}}>
              <strong className="col-md-6">{stock.ticker}:</strong>
              <span className="col-md-6 textright">${stock.close_price}</span>
              <span className="col-md-12 smallwords centertext">{stock.name}</span>
              <span className="col-md-6">{stock[currentStrat]}</span>
              <span className="col-md-6 textright">{100-(Math.round((stockKey/filteredStocks.length)*100))}%</span>
            </Link></div>
            )
          stockKey++;
        }

        cards.push(<div className="card-deck" key={stockKey * 27}>
          {stocks[0]}
          {stocks[1]}
          {stocks[2]}

        </div>)
      }
      cards.push(<div key="dinosaur" className="col-md-12">
        <div className="col-md-1"></div>
        <button className="btn btn-secondary col-md-10" onClick={that.viewMore}>see more</button>
        <div className="col-md-1"></div>
        </div>)
    }


    return (
        <div >
          <Header />
          <div className="col-md-3">
          {this.setMetric}
          <select
            value={this.state.selectValue}
            onChange={this.handleChange}
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
          </div>
          <br/><br/>
          <div className="col-md-12 card-deck-wrapper">
          {cards}
          </div>
          <div>{}</div>
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
