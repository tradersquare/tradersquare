import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Modal from 'react-modal';
import getStratData from '../../actions/get_strat_data';


class Beta extends Component {
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
    this.props.getStratData("beta");
  }

  render() {
    const data = Util.handleData(this.props.percentileData, "beta", 1, 50, '0.0[00]')

    return (
      <div className={"clickable-card card " + data.color} onClick={this.openModal}>
        <h3 className="centerheading">VOLATILITY</h3>
        <h4 className="centertext">Beta: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={data.style}
        >
          <h2>Beta</h2>
          <p>beta less than 1 means that the stock is less volatile than the market, and vice versa for value over 1</p>
          <Link to="/strategyview" onClick={this.handleClick} className="btn btn-secondary">
            click to view stocks sorted by beta
          </Link>
        </Modal>

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

export default connect(mapStateToProps, {getStratData})(Beta);
