import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Modal from 'react-modal';
import getStratData from '../../actions/get_strat_data';


class Earnings extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {modalOpen: false}
  }

  openModal() {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  handleClick(){
    this.props.getStratData("earningsyield");
  }

  render() {
    const data = Util.handleData(this.props.percentileData, "earningsyield", 1, 50, '0.0[00]')

    return (
      <div className={"clickable-card card " + data.color} onClick={this.openModal}>
        <h3 className="centerheading">EARNINGS</h3>
        <h4 className="centertext">Earnings Yield: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={data.style}
        >
          <h2>Earnings Yield</h2>
          <br/>
          <p>    
          Earnings yield are the earnings per share for the most recent 12-month period divided by the current market price per share. The earnings yield (which is the inverse of the P/E ratio) shows the percentage of each dollar invested in the stock that was earned by the company. 
          <br/><br/>
          Money managers often compare the earnings yield of a broad market index (such as the S&P 500) to prevailing interest rates, such as the current 10-year Treasury yield. If the earnings yield is less than the rate of the 10-year Treasury yield, stocks as a whole may be considered overvalued. If the earnings yield is higher, stocks may considered undervalued relative to bonds.
            <br/><br/>
         <a href="http://www.investopedia.com/terms/p/price-earningsratio.asp#ixzz4MEjEEh00 ">   Read more on Investopedia</a>
         </p>
          <Link to="/strategyview" onClick={this.handleClick} className="btn btn-secondary">
            click to view winners in earnings yield
          </Link>
        </Modal>


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

export default connect(mapStateToProps, {getStratData})(Earnings);
