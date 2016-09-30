import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Axis extends Component {
  constructor(props) {
    super();
    this.scale = d3.scale.linear();

    this.axis  = d3.svg.axis()
     .scale(this.scale)
     .orient(props.orientation);
  }

  updateAxis() {
    let dates = this.props.dates;
    this.scale
      .range([ this.props.axisMargin, this.props.fullWidth - this.props.axisMargin ])
      .domain([ 24, 0 ]);
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis);
  }

  render() {
    this.updateAxis();

    const translate = `translate(0, ${this.props.height - this.props.bottomMargin})`;

    return(
      <g className="axis" transform={translate}></g>
    )

  }
}
