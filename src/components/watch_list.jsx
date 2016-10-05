import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Stock from './watch_list_stock';
import {connect} from 'react-redux';
import {Link} from 'react-router';


class Watchlist extends Component {
  constructor(props) {
    super(props);

    console.log('constructor', props)
  }

  componentDidMount() {
    // const this.favorites =
    console.log('compwillmt: ', this.props.watchList);
  }

  render() {
    return (
      <div>
        <Header />
        <Stock />
        {/* {this.props.stockData.name} */}
      </div>
    )
  }

}

function mapStateToProps(state) {
  console.log('whole state: ', state);
  return {
    watchList: state.watchList
  }
}

export default connect(mapStateToProps)(Watchlist)
