import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';


class Beta extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = Util.handleData(this.props.percentileData, "beta", 1, 50, '0.0[00]')

    return (
      <div className={"card " + data.color}>
        <h3 className="centerheading">VOLATILITY</h3>
        <h4 className="centertext">Beta: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

      </div>
    )
  }

}

// description 
// <p>*beta less than 1 means that the stock is less volatile than the market, and vice versa for value over 1</p>



function mapStateToProps(state) {
  return {
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps)(Beta);
