import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';

class FilterView extends Component {

  render() {
    return (
      <div >
      <div className="row header">
        <h1 className="heading col-md-7"><Link to="/">TraderSquare</Link></h1>
        <div className="col-md-3 top-padding">
          <SearchBar/>
        </div>
        <div className="col-md-2 top-padding">
          <StratNav/>
        </div>
      </div>
      </div>
    )

  }

}
function mapStateToProps(state) {
  return {
    filterData: {}
  }
}

export default connect(mapStateToProps)(FilterView)
