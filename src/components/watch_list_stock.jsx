import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Watchlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('more props: ', this.props);
    return (
      <div>
        {this.props.stock.name}
      </div>
    )
  }

}
