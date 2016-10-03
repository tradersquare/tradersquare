import axios from 'axios';

export const GET_DATA = 'GET_DATA';

export function searchStockData(ticker) {

  let serverReq = axios.get(`/stockDataTmp/${ticker}`);
  // let serverReq = axios.get(`/stockTest/${ticker}`)
  console.log('action: stock_search', serverReq);

  return {
    type: GET_DATA,
    payload: serverReq
  };
}
