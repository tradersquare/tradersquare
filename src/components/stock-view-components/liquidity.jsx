import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Modal from 'react-modal';
import getStratData from '../../actions/get_strat_data';


class Liquidity extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {modalOpen: false}
  }

  openModal() {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  handleClick(metric){
    this.props.getStratData(metric);
  }

  render() {
    const data1 = Util.handleData(this.props.percentileData, "currentratio", 1, 50, '0.0[00]')
    const data2 = Util.handleData(this.props.percentileData, "quickratio", 1, 50, '0.0[00]')

    return (
      <div className={"clickable-card card " + data1.color} onClick={this.openModal}>
        <h3 className="centerheading">Liquidity</h3>
        <h4 className="centertext">Current Ratio: {data1.value}</h4>
        <h4 className="centertext">{data1.percentileDisplay}</h4>
        <h4 className="centertext">Quick Ratio: {data2.value}</h4>
        <h4 className="centertext">{data2.percentileDisplay}</h4>
      
      <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={data1.style}
        >
          <h2>Current Ratio</h2>
          <p>say something about current ratio</p>
          <Link to="/strategyview" onClick={()=> {
            this.handleClick("currentratio")}} className="btn btn-secondary">
            click to view winners in current ratio
          </Link>
          <br />

          <h2>Quick Ratio</h2>
          <p>say something about quick ratio</p>
          <Link to="/strategyview" onClick={()=> {
            this.handleClick("quickratio")}} className="btn btn-secondary">
            click to view winners in quick ratio
          </Link>

        </Modal>

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

export default connect(mapStateToProps, {getStratData})(Liquidity);
