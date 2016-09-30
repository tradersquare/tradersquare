import axios from 'axios';

export const GET_PERCENTILE = 'GET_PERCENTILE';

export function searchStockData(ticker) {
  const metrics = ['pricetoearnings', 'earningsyield', 'dividendyield', 'altmanzscore', 'currentratio', 'quickratio', 'leverageratio', 'beta', 'roic', 'roa', 'roe'];
  return axios.all(tmpStock.map((ticker) => axios.get(`/stockDataTmp/${ticker}`)))
    .then(axios.spread((...data) => {
     console.log(".then", data[0].data.data)
     let stockInfo = data.map((stock) => stock.data.data)
     return {
       type: GET_STRAT_DATA,
       payload: stockInfo
     }
   }));
  let percentile = axios.get(`/getPercentile/${ticker}/${metric}`);
  console.log('action: percentile query', percentile);

  return {
    type: GET_PERCENTILE,
    payload: percentile
  };
}
