import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Watchlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('more props: ', this.props);
    const stock = this.props.stock;

    return (
      <div className="card col-xs-12 col-md-12 col-lg-12">
        <span className="col-md-4 col-sm-4 col-lg-4 col-xs-4">{stock.ticker}</span>
        <span className="col-md-4 col-sm-4 col-lg-4 col-xs-4">{stock.name}</span>
        <span className="col-md-4 col-sm-4 col-lg-4 col-xs-4">${stock.close_price}</span>
      </div>
    )
  }

}
