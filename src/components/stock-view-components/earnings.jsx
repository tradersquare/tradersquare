import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';

class PE extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const earningsyield = parseFloat(this.props.percentileData.earningsyield.value);

    let color = Util.cardColor(1, 50, this.props.percentileData, "earningsyield")

    return (
      <div className={"card " + color}>
        <h3 className="centerheading">EARNINGS</h3>
        <h4 className="centertext">{(earningsyield*100)}%</h4>
        <h4 className="centertext">percentile: {this.props.percentileData.earningsyield.percentile}%</h4>

      </div>
    )
  }

}

// description for earnings
// <p>*how much the stock is earning per share</p>



function mapStateToProps(state) {
  return {
    stockData: state.stock,
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps)(PE);
