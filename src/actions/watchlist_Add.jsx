import axios from 'axios';

export const ADD = "ADD";

export const GET_STRAT_DATA = "GET_STRAT_DATA"

export default function() {
  const tmpStock = ['FB', 'GOOG', 'TWTR', 'AMZN', 'TSLA', 'SCTY', 'F', 'NOK', 'SBUX', 'YHOO', 'AAPL', 'JPM'];
  return axios.all(tmpStock.map((ticker) => axios.get(`/stockDataTmp/${ticker}`)))
    .then(axios.spread((...data) => {
      console.log(".then", data[0].data.data)
      let stockInfo = data.map((stock) => stock.data.data)
      return {
        type: GET_STRAT_DATA,
        payload: stockInfo
      }
    }));
}
