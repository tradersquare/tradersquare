import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Numeral from 'numeral';

class Earnings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = Util.handleData(this.props.percentileData, "earningsyield", 1, 50, '0.0[00]')
    // const earningsyield = parseFloat(this.props.percentileData.earningsyield.value);
    // const percentile = Util.checkData(this.props.percentileData.earningsyield.percentile)
    // let color = Util.cardColor(1, 50, this.props.percentileData, "earningsyield")

    return (
      <div className={"card " + data.color}>
        <h3 className="centerheading">EARNINGS</h3>
        <h4 className="centertext">{data.value}%</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

      </div>
    )
  }

}

// description for earnings
// <p>*how much the stock is earning per share</p>



function mapStateToProps(state) {
  return {
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps)(Earnings);
