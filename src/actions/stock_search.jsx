import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const GET_STRAT = 'GET_STRAT';

export function searchStockData(ticker) {

  let serverReq = axios.get(`/stockData/${ticker}`)

  console.log('search my nodes', serverReq);

  return {
    type: GET_DATA,
    payload: serverReq
  };
}
