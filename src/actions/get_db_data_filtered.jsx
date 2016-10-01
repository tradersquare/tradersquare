import axios from 'axios';

export const GET_FILTERED_DATA = "GET_FILTERED_DATA";

export default function(strat) {
  let dbFilteredStock = axios.get(`/getFilteredDataDB/${strat}`);
  //   params: {
  //     filter: strat
  //   }
  // })
  // .then(function(res) {
  //   console.log('dbfilterstock:          ', res);
  // })
  return {
    type: GET_FILTERED_DATA,
    payload: dbFilteredStock
  };
}
