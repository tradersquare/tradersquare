import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';


class BM extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = Util.handleData(this.props.percentileData, "altmanzscore", 1, 50, '0.0[00]')
//NEED TO CALCULATE SEPARATELY
    return (
      <div className={"card " + data.color}>
        <h3 className="centerheading">VALUE</h3>
        <h4 className="centertext">B/M: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

      </div>
    )
  }

}

// description 
//<p>*undervalued if above 1, overvalued if below 1</p>


function mapStateToProps(state) {
  return {
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps)(BM);
