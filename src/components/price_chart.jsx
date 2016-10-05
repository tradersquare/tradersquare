import React, {Component} from 'react';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import Axis from './axis';
import d3 from 'd3';

export default class PriceChart extends Component {
  constructor(props) {
    super(props);

    // this.manipulateData = this.manipulateData.bind(this);
    // this.state = {
    //   dates: [],
    //   closingPrices: [],
    //   line: null,
    //   x: null,
    //   y: null,
    //   width: props.fullWidth
    // }

    this.dates = [];
    this.closingPrices = [];
    this.line = [];
    this.x = [];
    this.y = null;
    this.width = props.fullWidth;

    this.makeLine = this.makeLine.bind(this);
  }

  makeLine() {
    const props = this.props;
    let data = props.data;
    // console.log('props.data', data);
    this.width = props.width;
    // console.log('whats my width? ', props.width);

    //consider monentjs library for dates

    let closingPrices = data.map(d => d.close);

    // console.log('closingPrices arr: ', closingPrices);

    //test throws error when not a num:
    // this.state.closingPrices.forEach( v => {
    //   if (typeof v !== 'number') {
    //     console.error("ITS NOT A NUMBER");
    //   }
    // });

    let dumbData = data.map( (v, i) => {
      let oldDate = v.date;
      let y = Number(oldDate.slice(0, 4));
      let m = Number(oldDate.slice(5, 7));
      let d = Number(oldDate.slice(8));
      let date = new Date(y, m, d);
      // console.log('give me the date:', date);
      return {date, close: v.close};
    });

    //format: date: "Mon Jan 04 2016 00:00:00 GMT-0800 (Pacific Standard Time)"
    let dates = dumbData.map(d => d.date);
    var minN = d3.min(data, d =>  d.date);
    var maxN = d3.max(data, d =>  d.date);

    // console.log('min/maxN: ', minN, maxN);

    // console.log('dumbData: ', dumbData);

    //create scales:
    let x = d3.time.scale()
    .range([ props.width - props.axisMargin, props.axisMargin ])
    .domain([ d3.max(dates), d3.min(dates) ])

    let y = d3.scale.linear()
    .range([ props.height - props.bottomMargin, props.topMargin ])
    .domain([ d3.min(closingPrices) - 10, d3.max(closingPrices) + 10 ]);

    let line = d3.svg.line()
    .x(function(d) {return x(d.date)})
    .y(function(d) {return y(d.close)})

    // this.setState({
    //   dates,
    //   closingPrices,
    //   x,
    //   y,
    //   line: line(dumbData)
    // })

    this.dates = dates;
    this.closingPrices = closingPrices;
    this.x = x;
    this.y = y;
    this.line = line(dumbData);
    this.minX = minN;
    this.maxX = maxN;
  }

  componentWillMount() {
    this.makeLine();
  }

  componentWillUpdate() {
  //   this.setState({
  //     x: this.state.x
  //     .range([ this.state.width - this.props.axisMargin, this.props.axisMargin ])
  //   })
    this.makeLine();
  }

/* Following for additional chart functionality, i.e. zoom/pan
  componentDidMount() {
    const xScale = this.x;
    const yScale = this.y;
    const minDate = this.minN;
    const maxDate = this.maxN;
    // line = this.line;

    const zoom = d3.behavior.zoom()
      .x(xScale)
      .on('zoom', function() {
        if (xScale.domain()[0] < minDate) {
    	    var x = zoom.translate()[0] - xScale(minDate) + xScale.range()[0];
          zoom.translate([x, 0]);
        } else if (xScale.domain()[1] > maxDate) {
    	    var x = zoom.translate()[0] - xScale(maxDate) + xScale.range()[1];
          zoom.translate([x, 0]);
        }
        redrawChart();
        updateViewportFromChart();
      });

      // function updateViewportFromChart() {
      //   if ((xScale.domain()[0] <= minDate) && (xScale.domain()[1] >= maxDate)) {
      //     viewport.clear();
      //   }
      //   else {
      //     viewport.extent(xScale.domain());
      //   }
      //   navChart.select('.viewport').call(viewport);
      // }

  }
  */

  render() {
    let lineChart = this.line;
    return (
      <g className='line-chart'>
      <path stroke="blue" fill="none" strokeWidth="2" d={ lineChart }></path>
      <Axis orientation="bottom" {...this.props} dates={this.dates}  scale={this.x}/>
      <Axis orientation="left" {...this.props} closingPrices={this.closingPrices} scale={this.y}/>
      </g>
    )
  }
}
