import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Stock from './watch_list_stock';
import {connect} from 'react-redux';
import {Link} from 'react-router';


class Watchlist extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('compwillmt: ', this.props.watchList);
    const watchList = this.props.watchList;
    this.favorites = watchList.map( v => {
      return <Stock key={v.ticker} stock={v} />
    })
  }

  render() {
    return (
      <div>
        <Header />
        {this.favorites}
        {/* {this.props.stockData.name} */}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    watchList: state.watchList
  }
}

export default connect(mapStateToProps)(Watchlist)
