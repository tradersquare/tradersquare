import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';


class Liquidity extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = Util.handleData(this.props.percentileData, "beta", 1, 50, '0.0[00]')

    return (
      <div className={"card " + data.color}>
        <h3 className="centerheading">Liquidity</h3>
        <h4 className="centertext">{data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

      </div>
    )
  }

}

// description 
// <h4 className="centertext">current ratio: {stockData.currentratio}</h4>
//<h4 className="centertext">quick ratio: {stockData.quickratio}</h4>
//<p>*these two ratios measure the liquidity of a company</p>


function mapStateToProps(state) {
  return {
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps)(Liquidity);
