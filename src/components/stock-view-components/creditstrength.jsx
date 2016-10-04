import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Modal from 'react-modal';
import getStratData from '../../actions/get_strat_data';

class Credit extends Component {
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
    this.props.getStratData("altmanzscore");
  }

  render() {
    const data = Util.handleData(this.props.percentileData, "altmanzscore", 1, 50, '0.0[00]')

    return (
      <div className={"clickable-card card " + data.color} onClick={this.openModal}>
        <h3 className="centerheading">CREDIT STRENGTH</h3>
        <h4 className="centertext">Altman's Z-score: {data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>


        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={data.style}
        >
          <h2>Altman's Z-score</h2>
          <p>measures the likelihood of a company going bankrupt</p>
          <Link to="/strategyview" onClick={this.handleClick} className="btn btn-secondary">
            click to view winners in z-score
          </Link>
        </Modal>

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

export default connect(mapStateToProps, {getStratData})(Credit);
