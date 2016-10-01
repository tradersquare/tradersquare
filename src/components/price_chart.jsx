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

  let data = props.data;
  console.log('props.data', data);

  //consider monentjs library for dates
  // let dates = data.map(d => d.date);
  // let dates = [];
  // let i = 0;
  // data.map( val => {
  //   dates.push(i);
  //   i++;
  // });
  // console.log(dates);



  let closingPrices = data.map(d => d.adj_close);
  console.log(closingPrices);

  //test throws error when not a num:
  closingPrices.forEach( v => {
    if (typeof v !== 'number') {
      console.error("ITS NOT A NUMBER");
    }
  });

  // let j = -1;
  // let dumbData = [];
  let dumbData = data.map( (v, i) => {
    // j++;
    let oldDate = v.date;
    let y = Number(oldDate.slice(0, 4));
    let m = Number(oldDate.slice(5, 7));
    let d = Number(oldDate.slice(8));
    let date = new Date(y, m, d);
    // console.log('give me the date:', date);
    return {date, adj_close: v.adj_close}
  });

  let dates = dumbData.map(d => d.date);

  console.log('dumbData: ', dumbData);
  let x = d3.time.scale()
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
        <Axis orientation="bottom" {...props} dates={dates}  scale={x}/>
        <Axis orientation="left" {...props} closingPrices={closingPrices} scale={y}/>
      </g>
    )
}
