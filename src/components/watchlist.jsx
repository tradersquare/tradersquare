import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import getStratData from '../actions/watchlist_Add'

class WatchList extends Component {
  handleClick () {
    this.props.getStratData
  }

  render(){
    return (
        <div>
        <button onClick={this.getStratData}>something</button>
        </div>

      )
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps state: ', state);
  return {
    stockData: "something"
  }
}

export default connect(mapStateToProps, {})(WatchList)
