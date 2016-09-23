import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/watchlist_Add'

class WatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {selectValue: 'altmanzscore'}

    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    this.setState({selectValue: event.target.value})
  }

  render(){
    let currentStrat = this.state.selectValue;
    console.log('straaaaaaat', this.props.strategyData);
    let stratData = this.props.strategyData.sort((a,b) => {
      if(a[currentStrat] > b[currentStrat]) return -1;
      if(a[currentStrat] < b[currentStrat]) return 1;
    })
    let stockKey = 0;

    stratData = this.props.strategyData.map((stock) => {
      stockKey++;
      return (
      <tr key={stockKey}>
          <td>{stock.ticker}</td>
          <td>{stock.name}</td>
          <td>{stock[currentStrat].toFixed(3)}</td>
          <td>{100-(Math.round((stockKey/this.props.strategyData.length)*100))}%</td>
      </tr>)
    })
    return (
        <div>
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
          </select>
          <table>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Value</th>
            <th>Percentile</th>
          </tr>
          {stratData}
          </table>
        </div>

      )
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps state: ', state);
  return {
    strategyData: state.watchlist
  }
}

export default connect(mapStateToProps, {})(WatchList)
