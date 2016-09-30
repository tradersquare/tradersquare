import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import PriceChart from './price_chart';

class StockView extends Component {
  constructor(props) {
    super(props);

    this.renderPrices = this.renderPrices.bind(this);
  }

  renderPrices() {
    // console.log('top of renderPrices(): ', this.props.graphData)
    if (this.props.graphData.length === 0) {
      return (<div> no data yet</div>)
    }
    else {
      let data = [];
      // console.log('state.graphData: ', this.props.graphData[0]);
      // let i = 0;
      // console.log('state.graphData.i.close: ', this.props.graphData[i].close);

      // for (let i = 0; i < this.props.graphData.length; i++) {
      //   // console.log(this.props.graphData[i]);
      //   data.push(this.props.graphData[i].close);
      // }
      // console.log('100: ', data);

      const params = {
        width: 300,
        height: 500,
        axisMargin: 10,
        topMargin: 20,
        bottomMargin: 20,
        fullWidth: 350,
      }

      return (
        <svg width={ params.fullWidth } height={ params.height }>
          <PriceChart { ...params } data={ this.props.graphData } />
        </svg>
      )
    }
  }

  render() {
    console.log('inside stock_view Render');
    console.log('this.props.stockData: ', this.props.stockData);
    console.log('this.props.graphData: ', this.props.graphData);
    if(this.props.stockData === null){
      return (<div>
          <h1 className="centerheading landing-container">...LOADING</h1>
      </div>)
    }

    const stockData = this.props.stockData;
    console.log("***STOCKDATA***", stockData)
    const change = stockData.change > 0 ? "↑" : "↡"
    const earningsyield = parseFloat(stockData.earningsyield);
    const booktomarket = (parseFloat(stockData.bookvaluepershare) / parseFloat(stockData.close_price)).toFixed(3);
    return (
      <div>
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
          <div className="col-md-4">
            <h3>  {stockData.ticker} : {stockData.name}</h3>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4">
          <h3 className="price">${stockData.open_price}  {stockData.change}% {change}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {this.renderPrices()}
          </div>
          <div className="col-md-6">
            <div className="card col-md-12">
              <h3 className="centerheading">ABOUT</h3>
              <p>{stockData.short_description}</p>
            </div>
            <div className="card col-md-12">
              <h3 className="centerheading">KEY STATISTICS</h3>
                <h4 className="centertext">52 week high/low: {stockData['fiftytwo_week_high']}/{stockData['fiftytwo_week_low']}</h4>
                <h4 className="centertext">Market Cap: {stockData.marketcap}</h4>
                <h4 className="centertext">Volume: {stockData.volume}</h4>
                <h4 className="centertext">Open/Close: {stockData.open_price}/{stockData.close_price}</h4>
            </div>
          </div>
        </div>

        <div className="card-deck-wrapper">
          <div className="card-deck">
            <div className="card">
              <h3 className="centerheading">COST</h3>
              <h4 className="centertext">{stockData.pricetoearnings}</h4>
              <p>*P/E ratio represents how much investors are willing to pay (market price) per dollar of earnings</p>
            </div>
            <div className="card">
              <h3 className="centerheading">EARNINGS</h3>
              <h4 className="centertext">{(earningsyield*100)}%</h4>
              <p>*how much the stock is earning per share</p>
            </div>
            <div className="card">
              <h3 className="centerheading">DIVIDENDS</h3>
              <h4 className="centertext">{stockData.dividendyield}</h4>
              <p>*how much you are getting paid per share</p>
            </div>
          </div>

          <div className="card-deck">
            <div className="card">
              <h3 className="centerheading">CREDIT STRENGTH</h3>
              <h4 className="centertext">Beta: {stockData.altmanzscore}</h4>
              <p>*measures the likelihood of a company going bankrupt</p>
            </div>
            <div className="card">
              <h3 className="centerheading">LIQUIDITY</h3>
              <h4 className="centertext">current ratio: {stockData.currentratio}</h4>
              <h4 className="centertext">quick ratio: {stockData.quickratio}</h4>
              <p>*these two ratios measure the liquidity of a company</p>
            </div>
            <div className="card">
              <h3 className="centerheading">LEVERAGE</h3>
              <h4 className="centertext">{stockData.leverageratio}</h4>
              <p>*measures how much capital comes from debt</p>
            </div>
          </div>

          <div className="card-deck">
            <div className="card">
              <h3 className="centerheading">VOLATILITY</h3>
              <h4 className="centertext">Beta: {stockData.beta}</h4>
              <p>*beta less than 1 means that the stock is less volatile than the market, and vice versa for value over 1</p>
            </div>
            <div className="card">
              <h3 className="centerheading">PROFITABILITY</h3>
              <h4 className="centertext">return on invested capital: {stockData.roic}</h4>
              <h4 className="centertext">return on asset: {stockData.roa}</h4>
              <h4 className="centertext">return on equity: {stockData.roe}</h4>
              <p>*</p>
            </div>
            <div className="card">
              <h3 className="centerheading">VALUE</h3>
              <h4 className="centertext">book to market ratio: {booktomarket}</h4>
              <p>*undervalued if above 1, overvalued if below 1</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stockData: state.stock,
    graphData: state.graphData
  }
}

export default connect(mapStateToProps)(StockView);
