import axios from 'axios';

export const ADD = "ADD";
export const GET_STRAT_DATA = "GET_STRAT_DATA";

export default function() {

  let dbStock = axios.get(`/getDataDB`);;

  return {
    type: GET_STRAT_DATA,
    payload: dbStock
  };
}
