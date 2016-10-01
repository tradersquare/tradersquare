import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class PE extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let color = "green"
    console.log("in pe", this.props.percentileData)
    if(this.props.percentileData){    
      if(this.props.percentileData.pricetoearnings.percentile > 30){
        color = "red";
      }
    }
    return (
      <div className={"card " + color}>
        <h3 className="centerheading">COST</h3>
        <h4 className="centertext">{this.props.stockData.pricetoearnings}</h4>
        <p>*P/E ratio represents how much investors are willing to pay (market price) per dollar of earnings</p>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    stockData: state.stock,
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps)(PE);
