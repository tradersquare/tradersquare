import axios from 'axios';

export function watchlistAdd() {
  let serverReq = axios.post('/stockData', {"ticker": "FB"})
  .then(function(res) {
    console.log('res::::: ',res);
  })
  .catch(function(err) {
    console.log('errrrrrrr', err);
  });
  return {
    type: STORE_DATA,
    payload: request
  }
}
