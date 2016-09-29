import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import getDBDataFiltered from '../actions/get_db_data_filtered';

class FilterView extends Component {
  constructor(props) {
    super(props);

    // this.state = {selectValue: 'altmanzscore', items: 10, flag: false}
    // this.handleClick = this.handleClick.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    this.props.getDBDataFiltered();
  }

  renderFilterList() {
    let counter = 0;
    return this.props.filterData.map((stock) => {
      counter++;
      return (
        <tbody key={counter}>
          <tr>
            <td>{stock.ticker}</td>
            <td>{stock.close_price}</td>
            <td>{stock.pricetoearnings}</td>
          </tr>
        </tbody>
        )
    })
  }


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
      <div className="row">
        <div className="col-md-6 filter">
        <h2> Filters </h2>
          <button className = "btn btn-secondary">
            TEST
          </button>
        </div>

        <div className="col-md-6 results">
        <h2> Results </h2>
          <table className="tablr">
          <tbody><tr>
            <th>Ticker</th>
            <th>Price</th>
          </tr></tbody>
          {this.renderFilterList()}
          </table>
        </div>

      </div>
      </div>
    )

  }

}
function mapStateToProps(state) {
  return {
    filterData: state.filterData
  }
}

export default connect(mapStateToProps, {getDBDataFiltered})(FilterView)
