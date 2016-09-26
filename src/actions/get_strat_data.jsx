import axios from 'axios';

export const ADD = "ADD";
export const GET_STRAT_DATA = "GET_STRAT_DATA";

export default function() {
  const tmpStock = [ 'MMM',
  'ABT',
  'ABBV',
  'ACN',
  'ATVI',
  'AYI',
  'ADBE',
  'AAP',
  'AES',
  'AET',
  'AFL',
  'AMG',
  'A',
  'APD',
  'AKAM',
  'ALK',
  'ALB',
  'AA'];

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
