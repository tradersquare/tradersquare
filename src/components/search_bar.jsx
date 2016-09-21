import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {searchStockData} from '../actions/index';
import {bindActionCreators} from 'redux';


class SearchBar extends Component {
  // componentWillMount() {
  //   this.props.searchStockData();
  // }

  constructor(props) {
    super(props);

    this.state = {
      ticker: 'TSLA'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTicker = this.setTicker.bind(this);
  }

  handleSubmit() {
    this.props.searchStockData(this.state.ticker);
    this.setState({ticker: ''});
  }

  setTicker(ev) {
    this.setState({ticker: ev.target.value});
  }

  render() {
    return (
      <div>
        <input value={this.state.ticker} onChange={this.setTicker} placeholder="Enter a Ticker here"></input>
        <Link to="/stockview" onClick={this.handleSubmit} className="btn btn-primary">
              Results
        </Link>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({searchStockData}, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);
