import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Stock from './watch_list_stock';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import addStock from '../actions/add_stock';


class Watchlist extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.addStock(null, this.props.watchlistData, this.props.auth.uid, true);
  }

  render() {
    let watchList = this.props.watchList;
    this.favorites = watchList.map( v => {
      // debugger;
      return <Stock key={v.ticker} stock={v} />
    })

    // debugger;
    return (
      <div className="pushdown-md">
        <Header />
        <div>
          <h2> My Watchlist </h2>
          <div className="col-xs-12 col-md-12 col-lg-12">
            <span className="col-md-4 col-sm-4 col-lg-4 col-xs-4">Ticker</span>
            <span className="col-md-4 col-sm-4 col-lg-4 col-xs-4">Company Name</span>
            <span className="col-md-4 col-sm-4 col-lg-4 col-xs-4">Closing Price</span>
          </div>
          {this.favorites}
        </div>
        {/* {this.props.stockData.name} */}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    watchList: state.watchList,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  {
    addStock: addStock
  },
    dispatch
  )};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist)
