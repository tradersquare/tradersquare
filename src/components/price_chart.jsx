import React from 'react';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import Axis from './axis';
// import d3 from 'd3';

export default (props) => {
  // return (
  //   <div>
  //     <Sparklines height={120} axis={true} width={180} data={props.data}>
  //       <SparklinesLine color={props.color} />
  //     </Sparklines>
  //   </div>
  // )

  const data = props.data;
  console.log('props.data', data);

  //consider monentjs library for dates
  // let dates = data.map(d => d.date);
  let dates = [];
  let i = 0;
  data.map( val => {
    dates.push(i);
    i++;
  });
  console.log(dates);
  let closingPrices = data.map(d => d.adj_close);
  console.log(closingPrices);

  //test throws error when not a num:
  closingPrices.forEach( v => {
    if (typeof v !== 'number') {
      console.error("ITS NOT A NUMBER");
    }
  });

  let j = -1;
  let dumbData = [];
  dumbData = data.map( v => {
    j++;
    return {date: j, adj_close: v.adj_close}
  })

  console.log('dumbData: ', dumbData);
  let x = d3.scale.linear()
    .range([ props.fullWidth - props.axisMargin, props.axisMargin ])
    .domain([ d3.min(dates), d3.max(dates) ])

  let y = d3.scale.linear()
    .range([ props.height - props.bottomMargin, props.topMargin ])
    .domain([ d3.min(closingPrices) - 10, d3.max(closingPrices) + 10 ]);

  let line = d3.svg.line()
    .x(function(d) {return x(d.date)})
    .y(function(d) {return y(d.adj_close)})

  let lineChart = line(dumbData);

    return (
      <g className='line-chart'>
        <path stroke="blue" fill="none" strokeWidth="2" d={ lineChart }></path>
        <Axis orientation="bottom" {...props} dates={dates}  />
        <Axis orientation="left" {...props} closingPrices={closingPrices}/>
      </g>
    )

    // return <div>nada</div>
}
