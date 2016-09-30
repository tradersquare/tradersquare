import React from 'react';
import {Sparklines, SparklinesLine} from 'react-sparklines';
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

  let dates = data.map(d => d.date);
  let closingPrice = dates.map(d => d.adj_close);
  console.log(d3);
  let x = d3.scale.linear()
    .range([ props.fullWidth - props.axisMargin, props.axisMargin ])
    .domain([ d3.min(dates), d3.max(dates) ])

  let y = d3.scale.linear()
    .range([ props.height - props.bottomMargin, props.topMargin ])
    .domain([ d3.min(closingPrice) - 10, d3.max(closingPrice) + 10 ]);

  let line = d3.line()
    .x(function(d) {return x(d.date)})
    .y(function(d) {return y(d.adj_close)})

  let lineChart = line(data);

    return (
      <g className='line-chart'>
        <path stroke="blue" fill="none" strokeWidth="2" d={ this.lineChart }></path>
      </g>
    )

    // return <div>nada</div>
}
