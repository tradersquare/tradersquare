import axios from 'axios';

export const GET_PERCENTILE = 'GET_PERCENTILE';

export default function (ticker) {
  
  const metrics = ['pricetoearnings', 'earningsyield', 'dividendyield', 'altmanzscore', 'currentratio', 'quickratio', 'leverageratio', 'beta', 'roic', 'roa', 'roe'];
  
  return axios.all(metrics.map((metric) => axios.get(`/getPercentile/${ticker}/${metric}`)))
    .then(axios.spread((...data) => {
     let percentiles = data.reduce((r, obj) => {
      const item = obj.data;
      if(obj.data){
        r[item.metric] = {
          percentile: item.percentile,
          value: item[item.metric]
        };
      }
        return r;
    }, {})
     console.log("PERCENTILE DATA", percentiles)
     return {
       type: GET_PERCENTILE,
       payload: percentiles
     }
   }));
}
