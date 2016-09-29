import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const GET_STRAT = 'GET_STRAT';

export function searchStockData(ticker) {

  let serverReq = axios.get(`/stockDataTmp/${ticker}`);
  console.log('action: stock_search', serverReq);

  return {
    type: GET_DATA,
    payload: serverReq
  };
}
