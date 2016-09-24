import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';


class StockView extends Component {

  render() {
    console.log('mapStateToProps rerender: ', this.props.stockData);
    let stockData = this.props.stockData.map((val) => {
      return (<div key={val}><span>{val[0]}</span> : <span>{val[1]}</span></div>);
    })

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
        <div className="col-md-6">
        <img className="col-md-12" src="http://i.stack.imgur.com/OxwLO.png"/>
        <div className="col-md-12">{stockData}</div>
        </div>
        <div className="col-md-6"><span>strat data goes here</span></div>
          
        
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
