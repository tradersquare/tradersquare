import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Modal from 'react-modal';
import getStratData from '../../actions/get_strat_data';

class BM extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {modalOpen: false};
  }

  openModal() {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  handleClick() {
    this.props.getStratData("pricetobook");
  }


  render() {
    const data = Util.handleData(this.props.percentileData, "pricetobook", 1, 50, '0.0[00]')
//NEED TO CALCULATE SEPARATELY
    return (
      <div className={"clickable-card card " + data.color} onClick={this.openModal}>
        <h3 className="centerheading">VALUE</h3>
        <h4 className="centertext">Price to Book: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={data.style}
        >
          <h2>Price to Book</h2>
          <p>The price-to-book ratio (P/B Ratio) is a ratio used to compare a stock's market value to its book value. It is calculated by dividing the current closing price of the stock by the latest quarter's book value per share. Calculated as: A lower P/B ratio could mean that the stock is undervalued. --Investopedia</p>
          <Link to="/strategyview" onClick={this.handleClick} className="btn btn-secondary">
            click to view winners in P/B
          </Link>
        </Modal>

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

export default connect(mapStateToProps, {getStratData})(BM);
