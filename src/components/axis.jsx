import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Axis extends Component {
  constructor(props) {
    super();

    this.scale = props.scale;

    // if (props.dates){
    //   this.scale = d3.time.scale();
    // }
    //
    // if (props.closingPrices) {
    //   this.scale = d3.scale.linear();
    // }

    this.axis  = d3.svg.axis()
     .scale(this.scale)
     .orient(props.orientation);
  }

  updateAxis() {
    if (this.props.dates) {
      let dates = this.props.dates;
      this.scale
        .range([ this.props.axisMargin, this.props.fullWidth - this.props.axisMargin ])
        .domain([ d3.min(dates), d3.max(dates) ]);

      this.axis
        .tickFormat(d3.time.format("%Y-%m-%d"))
        .ticks(2)
    }

    if (this.props.closingPrices) {
      let closingPrices = this.props.closingPrices;
      this.scale
        .range([ this.props.height - this.props.bottomMargin, this.props.topMargin ])
        .domain([ d3.min(closingPrices), d3.max(closingPrices) ]);

        this.axis
          .ticks(8)
    }
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis);
  }

  render() {
    this.updateAxis();
    let translate;
    if (this.props.dates) {
      console.log('this.props.dates');
      translate = `translate(0, ${this.props.height - this.props.bottomMargin})`;
    }

    if (this.props.closingPrices) {
      console.log('this.props.closingPrices');
      translate = `translate(${this.props.axisMargin}, 0)`;
    }

    return(
      <g className="axis" transform={translate}></g>
    )
  }
}
