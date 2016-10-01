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
        // .attr("class", "xaxis")
        .tickFormat(d3.time.format("%Y"))
        .ticks(5);


    }

    if (this.props.closingPrices) {
      let closingPrices = this.props.closingPrices;
      this.scale
        .range([ this.props.height - this.props.bottomMargin, this.props.topMargin ])
        .domain([ d3.min(closingPrices), d3.max(closingPrices) ]);

        this.axis
          .ticks(10)
    }
  }

  componentDidMount() {
    this.renderAxis();

    //Following for angling x-axis dates by 45 deg
    // d3.selectAll(".xaxis text")
    //   .attr("transform", function(d) {
    //         return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
    //   });
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
    let classes;
    if (this.props.dates) {
      console.log('this.props.dates');
      translate = `translate(0, ${this.props.height - this.props.bottomMargin})`;
      classes = 'axis xaxis'
    }

    if (this.props.closingPrices) {
      console.log('this.props.closingPrices');
      translate = `translate(${this.props.axisMargin}, 0)`;
      classes = 'axis'
    }

    return(
      <g className={classes} transform={translate}></g>
    )
  }
}
