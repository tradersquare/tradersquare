import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/watchlist_Add'

class WatchList extends Component {

  render(){
    console.log('straaaaaaat', this.props.strategyData);
    let stratData = this.props.strategyData.sort((a,b) => {
      if(a.altmanzscore > b.altmanzscore) return -1;
      if(a.altmanzscore < b.altmanzscore) return 1;
    })
    stratData = this.props.strategyData.map((stock) => {
      return (
      <tr>
          <td>{stock.ticker}</td>
          <td>{stock.name}</td>
          <td>{stock.altmanzscore}</td>
      </tr>)
    })
    return (
        <div>
          <table>{stratData}</table>
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
