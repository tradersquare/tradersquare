import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Modal from 'react-modal';
import getStratData from '../../actions/get_strat_data';



class PE extends Component {
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
    this.props.getStratData("pricetoearnings");
  }

  render() {
    // let color = Util.cardColor(-1, 50, this.props.percentileData, "pricetoearnings")
    const data = Util.handleData(this.props.percentileData, "pricetoearnings", -1, 50, '0.0[00]')

    return (
      <div className={"clickable-card card " + data.color} onClick={this.openModal}>
        <h3 className="centerheading">COST</h3>
        <h4 className="centertext">P/E Ratio: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={data.style}
        >
          <h2>Price to Earnings</h2>
          <br />
          <p>The price-earnings ratio (P/E Ratio) is the ratio for valuing a company that measures its current share price relative to its per-share earnings.
            <br/>
            <br />
            The price-earnings ratio can be calculated as:
            <br/>
            <br />
            <strong>Market Value per Share / Earnings per Share</strong>
            <br/>              
            <br />


              the price-earnings ratio indicates the dollar amount an investor can expect to invest in a company in order to receive one dollar of that company’s earnings. This is why the P/E is sometimes referred to as the multiple because it shows how much investors are willing to pay per dollar of earnings. If a company were currently trading at a multiple (P/E) of 20, the interpretation is that an investor is willing to pay $20 for $1 of current earnings. 
              <br />
              <br />
            <a href="http://www.investopedia.com/terms/p/price-earningsratio.asp#ixzz4MEjEEh00 ">   Read more on Investopedia</a>
            </p>
          <Link to="/strategyview" onClick={this.handleClick} className="btn btn-secondary">
            click to view winners in P/E
          </Link>
        </Modal>

      </div>
    )
  }

}

// description for P/E
//         <p>*P/E ratio represents how much investors are willing to pay (market price) per dollar of earnings</p>


function mapStateToProps(state) {
  return {
    stockData: state.stock,
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps, {getStratData})(PE);
