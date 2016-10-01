import axios from 'axios';

export const GET_FILTERED_DATA = "GET_FILTERED_DATA";

export default function(strat) {
  let dbFilteredStock = axios.get(`/getFilteredDataDB/`, {
    params: {
      filter: strat
    }
  });

  return {
    type: GET_FILTERED_DATA,
    payload: dbFilteredStock
  };
}
