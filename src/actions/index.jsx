import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const GET_STRAT = 'GET_STRAT';


export function getData() {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

  return {
    type: GET_DATA,
    payload: request
  };
}

export function searchStockData() {
  console.log('search my nodes')

  //get request to server goes here

  //return {
  //}
}
