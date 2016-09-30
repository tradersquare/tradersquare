import axios from 'axios';

export const GET_FILTERED_DATA = "GET_FILTERED_DATA";

export default function() {
  let dbFilteredStock = axios.get(`/getFilteredDataDB/`);;

  return {
    type: GET_FILTERED_DATA,
    payload: dbFilteredStock
  };
}
