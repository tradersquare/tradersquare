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
    if (this.props.graphData[0] === '') {
      return (<div> no data yet</div>)
    }
    else {
      let data = [];
      // console.log('state.graphData: ', this.props.graphData[0]);
      let i = 0;
      // console.log('state.graphData.i.close: ', this.props.graphData[i].close);
      for (let i = 0; i < 10; i++) {
        // console.log(this.props.graphData[i]);
        // data.push(this.props.graphData[i].close);
      }
      // console.log('100: ', data);
      return (
        <div>
        graph should go here
          <PriceChart data={data} color="green" />
        </div>
      )
    }
  }

  render() {
    console.log('inside stock_view Render');
    console.log('this.props.stockData: ', this.props.stockData);
    console.log('this.props.graphData: ', this.props.graphData);

    const stockData = this.props.stockData;
    console.log("***STOCKDATA***", stockData)
    const change = stockData.change > 0 ? "↑" : "↡"
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

        {this.renderPrices()}


        <div className="row">
          <img className="col-md-6" src="http://i.stack.imgur.com/OxwLO.png"/>
          <div className="col-md-6">
            <div className="card col-md-12">
              <h3>About {stockData.name}:</h3>
              <p>{stockData.short_description}</p>
            </div>
            <div className="card col-md-12">
              <h3>Key Statistics:</h3>
                <span>52 week high/low: {stockData['fiftytwo_week_high']}/{stockData['fiftytwo_week_low']}</span><br/>
                <span>Market Cap: {stockData.marketcap}</span><br/>
                <span>Volume: {stockData.volume}</span><br/>
                <span>Open/Close: {stockData.open_price}/{stockData.close_price}</span><br/>
            </div>
          </div>
        </div>

        <div className="card-deck-wrapper">
          <div className="card-deck">
            <div className="card">
              <h3 className="center">COST</h3>
              <h4>{stockData.pricetoearnings}</h4>
              <p>*P/E ratio represents how much investors are willing to pay (market price) per dollar of earnings</p>
            </div>
            <div className="card">
              <h3 className="center">EARNINGS</h3>
              <h4>{(stockData.earningsyield*100)}%</h4>
              <p>*how much the stock is earning per share</p>            
            </div>
            <div className="card">
              <h3 className="center">DIVIDENDS</h3>
              <h4>{stockData.dividendyield}</h4>
              <p>*how much you are getting paid per share</p>            
            </div>
          </div>

          <div className="card-deck">
            <div className="card">Market Cap: {stockData.marketcap}</div>
            <div className="card">Volume: {stockData.volume}</div>
            <div className="card">Open Price: {stockData.open_price}</div>
          </div>

          <div className="card-deck">
            <div className="card">Close Price: {stockData.close_price}</div>
            <div className="card">Beta: {stockData.beta}</div>
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
