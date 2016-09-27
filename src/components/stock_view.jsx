import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';


class StockView extends Component {
    // constructor(props) {
    //   this.state
    // }

  render() {
    const stockData = this.props.stockData;
    console.log('asdfsdff', stockData);

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

      <div>
        <h3>{stockData.ticker} : {stockData.name} {stockData.price}</h3>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img className="col-md-12" src="http://i.stack.imgur.com/OxwLO.png"/>
          <div className="col-md-12">
            <div className="col-md-6">52 week low: {stockData['52_week_low']}</div>
            <div className="col-md-6">52 week high: {stockData['52_week_high']}</div>
            <div className="col-md-6">Basic EPS: {stockData.basiceps}</div>
            <div className="col-md-6">Market Cap: {stockData.marketcap}</div>
            <div className="col-md-6">Volume: {stockData.volume}</div>
            <div className="col-md-6">Open Price: {stockData.open_price}</div>
            <div className="col-md-6">Close Price: {stockData.close_price}</div>
            <div className="col-md-6">Beta: {stockData.beta}</div>
            {/* <div></div>
            <div></div>
            <div></div> */}
            <p className="col-md-12">{stockData.short_description}</p>
          </div>
        </div>
        <table className="col-md-6">
          <tr>
            <td className="col-md-12">Altman's Z-Score</td>
            <td>{stockData.altmanzscore}</td>
          </tr>
          <tr>
            <td className="col-md-12">Asset Turnover</td>
            <td>{stockData.assetturnover}</td>
          </tr>
          <tr>
            <td className="col-md-12">Gross Margin</td>
            <td>{stockData.grossmargin}</td>
          </tr>
          <tr>
            <td className="col-md-12">Price to Earnings</td>
            <td>{stockData.pricetoearnings}</td>
          </tr>
          <tr>
            <td className="col-md-12">Current Ratio</td>
            <td>{stockData.currentratio}</td>
          </tr>
          <tr>
            <td className="col-md-12">Debt to Equity</td>
            <td>{stockData.debttoequity}</td>
          </tr>
          <tr>
            <td className="col-md-12">Enterprise Value</td>
            <td>{stockData.eterprisevalue}</td>
          </tr>
          <tr>
            <td className="col-md-12">Earnings Yield</td>
            <td>{stockData.earningsyield}</td>
          </tr>
          <tr>
            <td className="col-md-12">Net Income Growth</td>
            <td>{stockData.netincomegrowth}</td>
          </tr>
          <tr>
            <td className="col-md-12">Return on Equity</td>
            <td>{stockData.roe}</td>
          </tr>
        </table>

      </div>
      <div>
      </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps state: ', state);
  return {
    stockData: state.stock
  }
}

export default connect(mapStateToProps)(StockView);
