import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';


class Credit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = Util.handleData(this.props.percentileData, "altmanzscore", 1, 50, '0.0[00]')

    return (
      <div className={"card " + data.color}>
        <h3 className="centerheading">CREDIT STRENGTH</h3>
        <h4 className="centertext">Z-score: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

      </div>
    )
  }

}

// description 
// <p>*measures the likelihood of a company going bankrupt</p>



function mapStateToProps(state) {
  return {
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps)(Credit);
