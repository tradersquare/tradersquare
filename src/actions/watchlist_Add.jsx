import axios from 'axios';

export const ADD = "ADD";

export const GET_STRAT_DATA = "GET_STRAT_DATA"

export default function() {
  // const tmpStock = ['FB', 'GOOG', 'TWTR', 'AMZN', 'TSLA', 'SCTY', 'F', 'NOK', 'SBUX', 'YHOO', 'AAPL', 'JPM'];
  // axios.all(tmpStock.map((ticker) => axios.get(`/stockDataTmp/${ticker}`)))
  //   .then(axios.spread((...data) => {
  //     console.log(".then", data[0].data.data)
  //     return {
  //       type: GET_STRAT_DATA,
  //       payload: {}
  //     }
  //   }));

  let test = axios.get('/stockDataTmp/FB')
  console.log('in actions')
  return {
    type: GET_STRAT_DATA,
    payload: test
  }
}
