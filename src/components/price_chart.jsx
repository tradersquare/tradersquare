import React from 'react';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import Axis from './axis';
import d3 from 'd3';

export default (props) => {
  let data = props.data;
  console.log('props.data', data);

  //consider monentjs library for dates

  let closingPrices = data.map(d => d.close);
  console.log('closingPrices arr: ', closingPrices);

  //test throws error when not a num:
  closingPrices.forEach( v => {
    if (typeof v !== 'number') {
      console.error("ITS NOT A NUMBER");
    }
  });

  let dumbData = data.map( (v, i) => {
    let oldDate = v.date;
    let y = Number(oldDate.slice(0, 4));
    let m = Number(oldDate.slice(5, 7));
    let d = Number(oldDate.slice(8));
    let date = new Date(y, m, d);
    // console.log('give me the date:', date);
    return {date, close: v.close}
  });

  let dates = dumbData.map(d => d.date);

  console.log('dumbData: ', dumbData);
  let x = d3.time.scale()
    .range([ props.fullWidth - props.axisMargin, props.axisMargin ])
    .domain([ d3.max(dates), d3.min(dates) ])

  let y = d3.scale.linear()
    .range([ props.height - props.bottomMargin, props.topMargin ])
    .domain([ d3.min(closingPrices) - 10, d3.max(closingPrices) + 10 ]);

  let line = d3.svg.line()
    .x(function(d) {return x(d.date)})
    .y(function(d) {return y(d.close)})

  let lineChart = line(dumbData);

    return (
      <g className='line-chart'>
        <path stroke="blue" fill="none" strokeWidth="2" d={ lineChart }></path>
        <Axis orientation="bottom" {...props} dates={dates}  scale={x}/>
        <Axis orientation="left" {...props} closingPrices={closingPrices} scale={y}/>
      </g>
    )
}
