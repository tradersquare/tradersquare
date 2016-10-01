import axios from 'axios';

export const GET_PERCENTILE = 'GET_PERCENTILE';

export default function (ticker) {
  
  const metrics = ['pricetoearnings', 'earningsyield', 'dividendyield', 'altmanzscore', 'currentratio', 'quickratio', 'leverageratio', 'beta', 'roic', 'roa', 'roe'];
  
  return axios.all(metrics.map((metric) => axios.get(`/getPercentile/${ticker}/${metric}`)))
    .then(axios.spread((...data) => {
     // let percentiles = data.map((stock) => stock)
     console.log(data)
     return {
       type: GET_PERCENTILE,
       payload: percentiles
     }
   }));
}
