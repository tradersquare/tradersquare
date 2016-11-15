import axios from 'axios';

export const GET_DB_DATA = "GET_DB_DATA";

export default function() {
  let dbStock = axios.get(`/getDataDB`);;

  return {
    type: GET_DB_DATA,
    payload: dbStock
  }
}
