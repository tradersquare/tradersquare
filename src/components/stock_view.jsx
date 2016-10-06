import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import PriceChart from './price_chart';
import Loading from './loading';
import Header from './header';
import Numeral from 'numeral'
import ReactDOM from 'react-dom';
import d3 from 'd3';
import AddStock from '../actions/add_stock';

//stock view cards
import PE from './stock-view-components/pe'
import Earnings from './stock-view-components/earnings'
import Beta from './stock-view-components/beta'
import BM from './stock-view-components/BM'
import Credit from './stock-view-components/creditstrength'
import Dividends from './stock-view-components/dividends'
import Leverage from './stock-view-components/leverage'
import Profitability from './stock-view-components/profitability'
import Liquidity from './stock-view-components/liquidity'

class StockView extends Component {
  constructor(props) {
    super(props);

    this.renderPrices = this.renderPrices.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      chartWidth: 500
    }
  }

  renderPrices() {
    if (this.props.graphData.length === 0) {
      return (<div></div>)
    }
    else {
      let thisWidth = (this.refs.chartDivRef) ? this.refs.chartDivRef.clientWidth : 400;
      // console.log('thisWidth', thisWidth);

      const params = {
        // width: 550,
        height: 400,
        axisMargin: 43,
        topMargin: 20,
        bottomMargin: 60,
        fullWidth: thisWidth
      }

      return (
        <svg width={ thisWidth } height={ params.height }>
          <PriceChart { ...params } data={ this.props.graphData } width={thisWidth} />
        </svg>
      )
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
      }

  handleResize(e) {
    if (this.refs.chartDivRef) {
      // console.log('chartDivRef clientwidth: ', (this.refs.chartDivRef.clientWidth));
      //following forces a re-render, which forces chart to reset its width
      //the state.chartWidth is not actually used, but smt like following is needed...
      this.setState({
        chartWidth: this.refs.chartDivRef.clientWidth
      })
    }
  }

  handleAdd(ev) {
    // ev.preventDefault();
    let stockData = this.props.stockData;
    console.log('handleAdd :', stockData);
    this.props.AddStock(stockData);
  }

  render() {
    // console.log('inside stock_view Render');
    // console.log('this.props.stockData: ', this.props.stockData);
    // console.log('this.props.graphData: ', this.props.graphData);
    // console.log('this.props.percentileData: ', this.props.percentileData);
    // console.log('equal? ', this.state.chartWidth, this.refs.chartDivRef);
    // let priceChart = <div></div>;


    if(!this.props.stockData || !this.props.percentileData || !this.props.graphData){
      // console.log(this.props.stockData, this.props.percentileData, this.props.graphData)
      // priceChart = <div></div>;
      return (
        <div>
          <Loading />
          <div className="col-md-6" ref='chartDivRef'></div>
        </div>
      )
    }

    if(this.props.stockData === "invalid"){
      return (
        <div>
        <Header />
        <div className="col-md-2"></div>
        <div className="col-md-8 pushdown">
          <h2 className="col-md-12 centerheading">please enter a valid ticker</h2>
          <Link to="/" className="col-md-12 centertext">go back to home</Link>
        </div>
        <div className="col-md-2"></div>
        </div>
        )
    }

    let priceChart = this.renderPrices();
    let chart =
    <div className="col-md-6" ref='chartDivRef'>
    {priceChart}
    </div>
    // if (this.refs.chartDivRef && this.refs.chartDivRef.clientWidth !== this.state.chartWidth){
    //   console.log('not equal: ');
    //   priceChart = this.renderPrices();
    // }

    const stockData = this.props.stockData;
    const metrics = this.props.percentileData;
    console.log("***STOCKDATA***", stockData);
    const change = stockData.change > 0 ? "↑" : "↓"
    // const earningsyield = parseFloat(stockData.earningsyield);
    // const booktomarket = (parseFloat(stockData.bookvaluepershare) / parseFloat(stockData.close_price)).toFixed(3);

    return (
      <div>
        <Header />
        <div className="row">
          <div className="col-md-4">
            <h3>  {stockData.ticker} : {stockData.name}</h3>
          </div>
          <div className="col-md-4">
            <Link to="/watchlist" onClick={this.handleAdd} className="btn btn-secondary">
                  Add to Watchlist
            </Link>
          </div>
          <div className="col-md-4">
          <h3 className="price">${stockData.open_price}  {stockData.change}% {change}</h3>
          </div>
        </div>
        <div className="row">
          {chart}
          {/* <div className="col-md-6" ref='chartDivRef'>
            {priceChart}
          </div> */}
          <div className="col-md-6">
            <div className="card col-md-12">
              <h3 className="centerheading">ABOUT</h3>
              <p>{stockData.short_description}</p>
            </div>
            <div className="card col-md-12">
              <h3 className="centerheading">KEY STATISTICS</h3>
                <h4 className="centertext">52 week high/low: {stockData['fiftytwo_week_high']}/{stockData['fiftytwo_week_low']}</h4>
                <h4 className="centertext">Market Cap: {Numeral(parseFloat(stockData.marketcap)).format('0,0')}</h4>
                <h4 className="centertext">Average Volume: {stockData["average_daily_volume"]}</h4>
                <h4 className="centertext">Open/Close: {stockData.open_price}/{stockData.close_price}</h4>
            </div>
          </div>
        </div>

        <div className="card-deck-wrapper">
          <div className="card-deck">
              <PE />
              <Earnings />
              <Dividends />
          </div>
          <div className="card-deck">
              <Credit />
              <Leverage />
              <BM />
          </div>
          <div className="card-deck">
              <Liquidity />
              <Beta />
              <Profitability />
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    stockData: state.stock,
    graphData: state.graphData,
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps, {AddStock})(StockView);
